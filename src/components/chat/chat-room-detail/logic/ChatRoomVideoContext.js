import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';

const WebRtcContext = createContext();

// 여기서 pc 객체를 통합 관리한다.
export const ChatRoomVideoContext = ({ children, chatRoomId }) => {
  const socket = useSocket();
  const peers = useRef({});
  const streams = useRef({});
  const [checkSocket, setCheckSocket] = useState(1);
  const [streamReadyState, setStreamReadyState] = useState({}); // 각 사용자에 대해 스트림 준비 상태 관리

  console.log(`ChatRoomVideoContext 동작`);
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

  const addStream = (userId, stream) => {
    console.log(`addStream 동작 || userId : ${userId}`);
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

    if (socket && socket.connected) {
      console.log('체크 동작1');
    }

    if (!socket && !socket.connected) {
      console.log('체크 동작2');

      setCheckSocket(checkSocket + 1);
    }

    const { joinChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
    joinChatRoomVideo(chatRoomId);

    return () => {
      const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
      leaveChatRoomVideo(chatRoomId);
    };
  }, [socket, checkSocket, chatRoomId]);

  return (
    <WebRtcContext.Provider
      value={{
        peers,
        streams,
        iceServers,
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
