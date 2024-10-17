import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWebRtc } from '../logic/ChatRoomVideoContext';
import ChatRoomVideoAudioComponent from './ChatRoomVideoAudioComponent';

const ChatRoomVideoViewComponent = () => {
  const { chatRoomVideoMembers, status } = useSelector(
    (state) => state.chat.chatRoomDetails
  );
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const { getStream, isStreamReady, streamReadyState } = useWebRtc();

  const videoRefs = useRef({});

  console.log('ChatRoomVideoViewComponent');

  useEffect(() => {
    if (chatRoomVideoMembers && isStreamReady(userInfo.id)) {
      console.log(
        '화상화면 useEffect 동작',
        'streamReadyState : ',
        streamReadyState
      );

      chatRoomVideoMembers.forEach((member) => {
        // const videoElement = document.getElementById(`video-${member.id}`);
        const videoElement = videoRefs.current[member.id];
        const stream = getStream(member.id);

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
    }
    // }, [chatRoomVideoMembers, status, streamReadyState]);
  }, [chatRoomVideoMembers, streamReadyState]);

  // if (videoStatus === 'succeeded' && isStreamReady(userInfo.id)) {
  if (isStreamReady(userInfo.id)) {
    console.log(
      '화면 재랜더링',
      'chatRoomVideoMembers: ',
      chatRoomVideoMembers,
      'streamReadyState : ',
      streamReadyState
    );

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
              {isStreamReady(member.id) ? ( // 스트림 준비 상태가 true일 때만 비디오 렌더링
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
                    videoRefs={videoRefs.current[member.id]}
                  />
                </>
              ) : (
                <p>스트림 준비 중...</p> // 스트림이 준비되지 않았을 때 표시
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default ChatRoomVideoViewComponent;
