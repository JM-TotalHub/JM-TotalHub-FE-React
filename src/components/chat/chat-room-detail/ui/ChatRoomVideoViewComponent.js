import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRtc } from '../logic/ChatRoomVideoContext';

const ChatRoomVideoViewComponent = () => {
  console.log(`ChatRoomVideoViewComponent 동작`);

  const { chatRoomVideoMembers, status } = useSelector(
    (state) => state.chat.chatRoomDetails
  );
  const { getStream, isStreamReady } = useWebRtc(); // 스트림과 준비 상태 가져오기 함수 추가

  // 멤버들의 스트림을 비디오 태그에 연결
  useEffect(() => {
    if (status === 'succeeded' && chatRoomVideoMembers) {
      console.log(`chatRoomVideoMembers :`);
      console.log(chatRoomVideoMembers);

      chatRoomVideoMembers.forEach((member) => {
        const videoElement = document.getElementById(`video-${member.id}`);
        const stream = getStream(member.id); // 각 멤버의 스트림 가져오기

        console.log(`페이지의 stream : `);
        console.log(stream);

        if (stream && videoElement) {
          videoElement.srcObject = stream; // 스트림을 video 태그에 연결
          console.log('화면 출력 stream : ', stream, 'userId : ', member.id);

          videoElement.play().catch((error) => {
            console.error('비디오 재생 중 오류 발생:', error);
          });
        } else {
          console.log(`비디오 태그가 아직 존재하지 않음 또는 스트림 없음`);
        }
      });
    }
  }, [chatRoomVideoMembers, getStream, status]);

  if (status === 'succeeded') {
    console.log(`화면 재랜더링`);

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
                <video
                  id={`video-${member.id}`} // 각 멤버의 video 태그에 고유 ID 할당
                  autoPlay
                  playsInline
                  style={{
                    width: '300px',
                    height: '200px',
                    backgroundColor: 'black', // 문제 해결을 위해 제거
                  }}
                ></video>
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
