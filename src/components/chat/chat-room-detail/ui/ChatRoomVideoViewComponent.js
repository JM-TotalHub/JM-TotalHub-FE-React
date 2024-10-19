import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebRtc } from '../logic/ChatRoomVideoContext';
import ChatRoomVideoAudioComponent from './ChatRoomVideoAudioComponent';

const ChatRoomVideoViewComponent = () => {
  const { chatRoomVideoMembers, status } = useSelector(
    (state) => state.chat.chatRoomDetails
  );
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const { getStream, isAllStreamReady, streamReadyState } = useWebRtc(); // webrtc 관련 함수

  const videoRefs = useRef({}); // 비디오 객체 리스트

  const [videoReady, setVideoReady] = useState('false'); // 비디오 설정 완료 체크(이것이 최종 체크변수)

  console.log(
    'ChatRoomVideoViewComponent 랜더링 & 상태값 체크 || ',
    'chatRoomVideoMembers: ',
    chatRoomVideoMembers,
    'videoRefs : ',
    videoRefs,
    'videoReady : ',
    videoReady
  );

  useEffect(() => {
    if (!chatRoomVideoMembers) return;

    setVideoReady(false);

    const joinUserIds = chatRoomVideoMembers.map((member) => member.id);
    console.log('비디오 화면 useEffect = joinUserIds :', joinUserIds);
    console.log(
      '비디오 화면 useEffect = chatRoomVideoMembers :',
      chatRoomVideoMembers
    );
    console.log(
      '비디오 화면 useEffect = isAllStreamReady :',
      isAllStreamReady(joinUserIds)
    );

    if (chatRoomVideoMembers && isAllStreamReady(joinUserIds)) {
      chatRoomVideoMembers.forEach((member) => {
        const videoElement = videoRefs.current[member.id];
        const stream = getStream(member.id);

        console.log(member.email, '의 videoRefs 삽입');

        if (stream && videoElement) {
          videoElement.srcObject = stream;
          console.log('화면 출력 stream : ', stream, 'userId : ', member.id);

          videoElement.play().catch((error) => {
            console.error('비디오 재생 중 오류 발생:', error);
          });
        } else {
          console.log(`비디오 태그가 아직 존재하지 않음 또는 스트림 없음`);
        }
      });
      setVideoReady(true);
    }
    // }, [chatRoomVideoMembers, streamReadyState, videoReady]);
  }, [streamReadyState, videoReady]);

  // if (isStreamReady(userInfo.id) && videoReady) {
  if (videoReady) {
    return (
      <div>
        <h3>화상채팅 페이지</h3>
        <div>
          <h1>화상채팅 참가인원</h1>
          {chatRoomVideoMembers.map((member, index) => (
            <div key={index}>
              <div>ID: {member.id}</div>
              <div>Email: {member.email}</div>
              <div>NickName: {member.nickname}</div>
              {/* {isStreamReady(member.id) ? ( // 스트림 준비 상태가 true일 때만 비디오 렌더링 */}
              <>
                <video
                  ref={(el) => (videoRefs.current[member.id] = el)} // ref에 비디오 요소 저장
                  id={`video-${member.id}`} // 각 멤버의 video 태그에 고유 ID 할당
                  autoPlay
                  playsInline
                  style={{
                    width: '300px',
                    height: '200px',
                    backgroundColor: 'black', // 문제 해결을 위해 제거
                  }}
                ></video>
                <ChatRoomVideoAudioComponent
                  videoRef={videoRefs.current[member.id]}
                />
              </>
              {/* ) : (
                <p>스트림 준비 중...</p> // 스트림이 준비되지 않았을 때 표시
              )} */}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    <p>스트림 준비 중...</p>;
  }

  return null;
};

export default ChatRoomVideoViewComponent;
