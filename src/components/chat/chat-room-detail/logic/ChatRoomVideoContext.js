import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';
import { useDispatch, useSelector } from 'react-redux';
import {
  offChatRoomVideo,
  offChatRoomVideoData,
  offChatRoomVideoStarted,
  offLocalStream,
  onChatRoomVideoData,
  onLocalStream,
} from '../../../../features/domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';

const WebRtcContext = createContext();

// 여기서 pc 객체를 통합 관리한다.
export const ChatRoomVideoContext = ({ children, chatRoomId }) => {
  const { socket } = useSocket();
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const { localStreamReady } = useSelector(
    (state) => state.chat.chatRoomVideoStatus
  );

  const dispatch = useDispatch();

  const peers = useRef({});
  const streams = useRef({});
  const [streamReadyState, setStreamReadyState] = useState({}); // 각 사용자에 대해 스트림 준비 상태 관리

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
    console.log('addPeer 동작 || userId : ', userId, 'pc : ', pc);
    peers.current[userId] = pc;
  };

  const removePeer = (userId) => {
    delete peers.current[userId];
  };

  const getPeer = (userId) => {
    console.log('getPeer 동작 : ', userId, '의 pc : ', peers.current[userId]);
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
    console.log('addStream 동작 || userId : ', userId, 'stream : ', stream);
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

  const removeStream = (userId) => {
    delete streams.current[userId];
    setStreamReadyState((prev) => ({ ...prev, [userId]: false }));
  };

  // 화상채팅방 참가
  useEffect(() => {
    if (!localStreamReady) {
      const setupLocalStream = async () => {
        const localStream = await createLocalStream();
        console.log(`로컬 스트림 생성 :`, localStream);
        // 로컬스트림 상태
        dispatch(onLocalStream());
        addStream(userInfo.id, localStream);
      };

      setupLocalStream();
    } else {
      const { joinChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
      joinChatRoomVideo(userInfo.id, chatRoomId);

      const handleBeforeUnload = (event) => {
        // event.preventDefault();
        // event.returnValue = '';
        const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
        leaveChatRoomVideo(userInfo.id, chatRoomId);

        dispatch(offChatRoomVideo());
        dispatch(offLocalStream());
        dispatch(offChatRoomVideoData());
        dispatch(offChatRoomVideoStarted());
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        console.log('ChatRoomVideoContext 언마운트');

        const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
        leaveChatRoomVideo(userInfo.id, chatRoomId);

        dispatch(offChatRoomVideo());
        dispatch(offLocalStream());
        dispatch(offChatRoomVideoData());
        dispatch(offChatRoomVideoStarted());

        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [socket, userInfo, chatRoomId, localStreamReady]);

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
