import { useCallback, useRef } from 'react';
import {
  addPeer,
  addStream,
} from '../../features/domains/chat/chat-room/slices/ChatRoomWebRtcSlice';
import ChatRoomVideoEmitterHandler from './socket-handler/chat-room/ChatRoomVideoEmitterHandler';

const WebRtcManager = (socket, dispatch, peers) => {
  console.log('WebRtcManager 호출됨');

  // ice 서버 설정
  const iceServers = {
    // iceServers: [
    //   { urls: 'stun:stun.l.google.com:19302' }, // 공용 STUN 서버
    //   {
    //     urls: 'turn:your.turn.server:3478', // TURN 서버
    //     username: 'your_username',
    //     credential: 'your_credential',
    //   },
    // ],
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // Google STUN 서버
      { urls: 'stun:stun1.l.google.com:19302' }, // 추가 Google STUN 서버
      { urls: 'stun:stun2.l.google.com:19302' }, // 추가 Google STUN 서버
      { urls: 'stun:stun3.l.google.com:19302' }, // 추가 Google STUN 서버
      { urls: 'stun:stun4.l.google.com:19302' }, // 추가 Google STUN 서버
    ],
  };

  // 클라이언트가 상대(userId)를 위한 pc 객체 생성 및 등록
  const createPeerConnection = useCallback(async (chatRoomId, userId) => {
    console.log(`createPeerConnection 호출됨`);

    const { sendIceCandidate } = ChatRoomVideoEmitterHandler(socket);

    const pc = new RTCPeerConnection(iceServers);
    if (!pc) {
      console.error('RTCPeerConnection 생성 실패');
      return;
    }
    console.log('RTCPeerConnection 생성 성공: ', pc);

    // ICE 후보 수집 이벤트 등록
    pc.onicecandidate = (event) => {
      console.log(`onicecandidate 동작`);

      if (event.candidate) {
        // ICE 후보를 전송하는 로직 추가 (소캣)
        sendIceCandidate(userId, event.candidate);
      }
    };

    pc.onicegatheringstatechange = () => {
      console.log(`ICE gathering state: ${pc.iceGatheringState}`);
    };

    // 스트림 연결 이벤트 등록
    pc.ontrack = (event) => {
      console.log(`ontrack 동작`);
      const remoteStream = event.streams[0];
      dispatch(addStream(userId, remoteStream));
    };

    dispatch(addPeer(userId, pc));

    return pc;
  }, []);

  const createOffer = useCallback(async (peers, chatRoomId, userId) => {
    console.log(`createOffer 동작`);

    const { sendOffer } = ChatRoomVideoEmitterHandler(socket);
    console.log('여기까지 들어옴');
    console.log(peers);

    if (!peers || Object.entries(peers).length === 0) {
      console.log('기존 화상채팅 참가자 없음');

      return;
    }

    const pc = peers[userId];

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);

    sendOffer(userId, offer);
  }, []);

  // return {
  //   createPeerConnection,
  //   createOffer,
  // };

  const webRtcManagerRef = useRef({
    createPeerConnection,
    createOffer,
  });

  return webRtcManagerRef.current;
};

export default WebRtcManager;
