import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebRtc } from '../logic/ChatRoomVideoContext';
import ChatRoomVideoAudioComponent from './ChatRoomVideoAudioComponent';
import {
  MyVideoContainer,
  MemberVideo,
  MemberVideoContainer,
  VideoContainer,
  MyVideo,
  MemberVideoItem,
} from './styles/ChatRoomVideoViewStyles';

const ChatRoomVideoViewComponent = () => {
  const { chatRoomVideoMembers } = useSelector(
    (state) => state.chat.chatRoomDetails
  );
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const { getStream, isAllStreamReady, streamReadyState } = useWebRtc(); // webrtc 관련 함수

  const videoRefs = useRef({}); // 비디오 객체 리스트

  const [videoReady, setVideoReady] = useState('false'); // 비디오 설정 완료 체크(이것이 최종 체크변수)
  const [videoReadyTrigger, setVideoReadyTrigger] = useState(false);
  const [videoChatReady, setVideoChatReady] = useState('false');

  console.log(
    '^^^^^^^^^^^^^^^^^^^^^^^ChatRoomVideoViewComponent 랜더링 & 상태값 체크 || ',
    'chatRoomVideoMembers: ',
    chatRoomVideoMembers,
    'streamReadyState : ',
    streamReadyState,
    'videoRefs : ',
    videoRefs,
    'videoReady : ',
    videoReady
  );

  useEffect(() => {
    if (!chatRoomVideoMembers) return;

    setVideoReady(false);

    const joinUserIds = chatRoomVideoMembers.map((member) => member.id);

    if (chatRoomVideoMembers && isAllStreamReady(joinUserIds)) {
      chatRoomVideoMembers.forEach((member) => {
        const videoElement = videoRefs.current[member.id];
        const stream = getStream(member.id);

        if (stream && videoElement) {
          videoElement.srcObject = stream;
          videoElement.muted = member.id === userInfo.id;

          videoElement.play().catch((error) => {
            console.error('비디오 재생 중 오류 발생:', error);
          });
        } else {
          console.log(`비디오 태그가 아직 존재하지 않음 또는 스트림 없음`);
        }
      });
      setVideoReady(true);
      setVideoReadyTrigger((prev) => !prev);
    }
    // }, [streamReadyState, videoReady]);
  }, [streamReadyState]);

  useEffect(() => {}, [videoReady]);

  // if (videoReady) {
  console.log('화면 구성시작 = videoRefs : ', videoRefs);

  return (
    <VideoContainer>
      <MemberVideoContainer>
        {chatRoomVideoMembers
          .filter((member) => member.id !== userInfo.id)
          .map((member, index) => (
            <MemberVideoItem
              key={index}
              membersCount={chatRoomVideoMembers.length - 1}
            >
              <div>ID: {member.id}</div>
              <div>Email: {member.email}</div>
              <div>NickName: {member.nickname}</div>
              {/* {isStreamReady(member.id) ? ( // 스트림 준비 상태가 true일 때만 비디오 렌더링 */}
              <MemberVideo
                ref={(el) => (videoRefs.current[member.id] = el)} // ref에 비디오 요소 저장
                id={`video-${member.id}`} // 각 멤버의 video 태그에 고유 ID 할당
                autoPlay
                playsInline
              ></MemberVideo>

              <ChatRoomVideoAudioComponent
                videoRef={videoRefs.current[member.id]}
              />
              {/* ) : (
                <p>스트림 준비 중...</p> // 스트림이 준비되지 않았을 때 표시
              )} */}
            </MemberVideoItem>
          ))}
      </MemberVideoContainer>

      {/* 본인 비디오 */}
      <MyVideoContainer>
        <MyVideo
          ref={(el) => (videoRefs.current[userInfo.id] = el)} // 본인 비디오 요소 저장
          id={`video-${userInfo.id}`}
          autoPlay
          playsInline
          muted
        ></MyVideo>
      </MyVideoContainer>
    </VideoContainer>
  );
  // } else {
  //   <p>스트림 준비 중...</p>;
  // }

  // return null;
};

export default ChatRoomVideoViewComponent;
