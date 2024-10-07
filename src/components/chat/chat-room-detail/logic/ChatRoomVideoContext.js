import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';
import { useSelector } from 'react-redux';

const WebRtcContext = createContext();

// 여기서 pc 객체를 통합 관리한다.
export const ChatRoomVideoContext = ({ children, chatRoomId }) => {
  const { socket } = useSocket();
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const peers = useRef({});
  const streams = useRef({});
  const [streamReadyState, setStreamReadyState] = useState({}); // 각 사용자에 대해 스트림 준비 상태 관리

  console.log(`ChatRoomVideoContext 동작`);
  console.log(peers);
  console.log(streams);
  console.log(streamReadyState);
  console.log(`ChatRoomVideoContext의 소캣 :`);
  console.log(socket);

  const iceServers = {
    iceServers: [
      // { urls: 'stun:15.165.250.99:3478' }, // Coturn STUN 서버
      { urls: 'stun:stun.l.google.com:19302' }, // Google STUN 서버
      {
        urls: 'turn:15.165.250.99:3478', // Coturn TURN 서버
        username: 'junmop950', // Coturn 사용자 이름
        credential: 'qwer1029', // Coturn 비밀번호
      },
    ],
  };

  const addPeer = async (userId, pc) => {
    console.log(`addPeer 동작 || userId : ${userId}, pc :${pc}`);
    peers.current[userId] = pc;

    console.log(peers);
  };

  const removePeer = (userId, pc) => {
    delete peers.current[userId];
  };

  const getPeer = (userId) => {
    console.log(`getPeer 동작 : ${userId} 의 pc : ${peers.current[userId]}`);
    // return peers[userId];
    return peers.current[userId];
  };

  const createLocalStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    return localStream;
  };

  const addStream = (userId, stream) => {
    console.log(`addStream 동작 || userId : ${userId}`);
    console.log(stream);

    streams.current[userId] = stream;
    setStreamReadyState((prev) => ({ ...prev, [userId]: true }));
  };

  const getStream = (userId) => {
    console.log(
      `getStream 동작 : ${userId} 의 stream : ${streams.current[userId]}`
    );
    console.log(streams.current[userId]);

    return streams.current[userId];
  };

  const isStreamReady = (userId) => {
    return !!streamReadyState[userId]; // 스트림이 준비된 상태인지 확인
  };

  const removeStream = (userId, pc) => {
    delete streams.current[userId];
    setStreamReadyState((prev) => ({ ...prev, [userId]: false }));
  };

  // 화상채팅방 참가
  useEffect(() => {
    console.log(`ChatRoomVideoContext에서 socket : `);
    console.log(socket);

    const setupLocalStream = async () => {
      // 로컬 스트림 생성 (완료될 때까지 대기)
      const localStream = await createLocalStream();
      console.log(`로컬 스트림 생성 완료:`, localStream);

      // 스트림 저장
      addStream(userInfo.id, localStream);
    };

    setupLocalStream();

    const { joinChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
    joinChatRoomVideo(userInfo.id, chatRoomId);

    // // 언마운트 안되는 경우를 대비한 동작 ()
    const handleBeforeUnload = (event) => {
      // 경고 메시지를 표시하는 방법
      event.preventDefault(); // Chrome에서는 이 값이 필요함
      event.returnValue = ''; // 사용자에게 경고 메시지를 표시

      const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
      leaveChatRoomVideo(userInfo.id, chatRoomId);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 언마운트 시 동작
    // 하지만 url통한 직접이동, 탭이나 브라우저 끄기, 새로고침 등에는 언마운트 동작안함 - 하지만 상태값은 초기화됨 재로드 개념이니
    // 그래서 beforeunload 이벤트를 통해 필수 꺼지기 전 필수로직 동작시킴
    return () => {
      console.log('ChatRoomVideoContext 언마운트');

      const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
      leaveChatRoomVideo(userInfo.id, chatRoomId);

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [socket, userInfo, chatRoomId]);

  return (
    <WebRtcContext.Provider
      value={{
        peers,
        streams,
        iceServers,
        streamReadyState,
        addPeer,
        removePeer,
        getPeer,
        addStream,
        getStream,
        removeStream,
        isStreamReady,
      }}
    >
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => {
  return useContext(WebRtcContext);
};
