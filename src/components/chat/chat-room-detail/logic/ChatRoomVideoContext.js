import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  offChatRoomVideo,
  offChatRoomVideoData,
  offChatRoomVideoStarted,
  offLocalStream,
  onLocalStream,
} from '../../../../features/domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';

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
    // console.log('addPeer 동작 || userId : ', userId, 'pc : ', pc);
    peers.current[userId] = pc;
  };

  const removePeer = (userId) => {
    delete peers.current[userId];
  };

  const getPeer = (userId) => {
    // console.log('getPeer 동작 : ', userId, '의 pc : ', peers.current[userId]);
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
    // console.log('addStream 동작 || userId : ', userId, 'stream : ', stream);
    streams.current[userId] = stream;

    setStreamReadyState((prev) => ({ ...prev, [userId]: true }));
  };

  const getStream = (userId) => {
    // console.log(
    //   'getStream 동작 :',
    //   userId,
    //   '의 stream :',
    //   streams.current[userId]
    // );
    // console.log(streams.current[userId]);

    return streams.current[userId];
  };

  const isStreamReady = (userId) => {
    return streamReadyState[userId]; // 스트림이 준비된 상태인지 확인
  };

  const isAllStreamReady = (userIds) => {
    // 이제 전체 스트림 확인
    // 참가자들의 id 리스트를 건내받아서 각각의 스트림이 준비되었는지 확인
    // console.log('isAllStreamReady의 streamReadyState : ', streamReadyState);
    return userIds.every((userId) => streamReadyState[userId] === true);
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
        // console.log(`로컬 스트림 생성 :`, localStream);
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
        // console.log('ChatRoomVideoContext 언마운트');

        // 화상채팅 방 나감 알림 이벤트
        const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
        leaveChatRoomVideo(userInfo.id, chatRoomId);

        // 브라우저에게 받은 스트림 권한 반환
        const localStream = getStream(userInfo.id);
        if (localStream) {
          localStream.getTracks().forEach((track) => {
            track.stop();
          });
        }

        // 리덕스 슬라이스 상태값 초기화
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
        isAllStreamReady,
      }}
    >
      {children}
    </WebRtcContext.Provider>
  );
};

export const useWebRtc = () => {
  return useContext(WebRtcContext);
};
