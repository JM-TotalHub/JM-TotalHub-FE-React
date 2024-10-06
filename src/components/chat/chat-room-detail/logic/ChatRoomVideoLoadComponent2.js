import { useSelector } from 'react-redux';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import { useWebRtc } from './ChatRoomVideoContext';
import ChatRoomVideoEmitterHandler2 from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler2';
import { useEffect } from 'react';

const ChatRoomVideoLoadComponent2 = ({ chatRoomId }) => {
  const { socket } = useSocket();
  const {
    peers,
    iceServers,
    addPeer,
    removePeer,
    getPeer,
    addStream,
    getStream,
  } = useWebRtc(); // 수정 부분: addStream, getStream 추가

  console.log(
    `answer 확인용 ChatRoomVideoLoadComponent2 chatRoomId : ${chatRoomId}`
  );

  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { chatRoomVideoMembers } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  // 피어연결 객체 생성 함수
  const createPeerConnection = async (chatRoomId, targetUserId) => {
    console.log(
      `로드 컴포넌트 createPeerConnection 동작 = 타켓유저 : ${targetUserId}`
    );

    if (getPeer(targetUserId)) {
      console.log(
        `${targetUserId} 사용자 에 대한 해당 피어 연결 객체가 이미 존재합니다`
      );
      return;
    }

    const { sendIceCandidate } = ChatRoomVideoEmitterHandler2(socket);

    const pc = new RTCPeerConnection(iceServers);

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    addStream(userInfo.id, localStream);

    const sentCandidates = new Set();

    pc.onicecandidate = (event) => {
      if (event.candidate && !sentCandidates.has(event.candidate.candidate)) {
        console.log(`onicecandidate 동작 : ${event.candidate.candidate}`);
        sendIceCandidate(chatRoomId, userInfo.id, event.candidate);
        sentCandidates.add(event.candidate.candidate);
      }
    };

    pc.ontrack = (event) => {
      console.log(`ontrack 동작 - 로드 컴포넌트`);

      const remoteStream = event.streams[0];

      if (remoteStream) {
        console.log('원격 스트림 수신 성공', remoteStream);
        console.log('비디오 트랙:', remoteStream.getVideoTracks());
        console.log('오디오 트랙:', remoteStream.getAudioTracks());
        addStream(targetUserId, remoteStream); // 원격 스트림 저장
      } else {
        console.error('원격 스트림 수신 실패');
      }

      // addStream(targetUserId, remoteStream);
    };

    console.log(`addPeer 확인`);
    console.log(pc);

    await addPeer(targetUserId, pc);

    await createOffer(chatRoomId, targetUserId, pc);

    return pc;
  };

  // 오퍼 객체 생성
  const createOffer = async (chatRoomId, targetUserId, pc) => {
    // const pc = getPeer(userId);
    if (!pc) {
      console.log(
        `offer 생성을 위한 ${targetUserId} 사용자에 대한 피어 연결이 없습니다`
      );
      console.log(peers);
      return;
    } else {
      console.log(`createOffer 동작 시작`);
    }

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      const { sendOffer } = ChatRoomVideoEmitterHandler2(socket);
      sendOffer(chatRoomId, userInfo.id, offer);
    } catch (error) {
      console.error('Offer 생성 또는 전송 중 오류 발생:', error);
    }
  };

  const closeAllConnections = () => {
    Object.keys(peers).forEach((userId) => {
      const pc = getPeer(userId);
      if (pc) {
        pc.close();
        removePeer(userId); // 피어 연결 제거
      }
    });
  };

  // webrtc 연결 시작 부분
  useEffect(() => {
    if (!chatRoomVideoMembers) return;

    if (!socket) {
      console.log('webrtc 연결 시작 부분 소캣이 없다.');
    }

    // 이미 pc 객체 만들어진 인원들의 userId
    const connectedUserIds = Object.keys(peers);

    // 새롭게 추가된 인원만 뽑기
    const targetMembers = chatRoomVideoMembers
      .filter((member) => member.id !== userInfo.id)
      .map((member) => member.id)
      .filter((memberId) => !connectedUserIds.includes(memberId));

    console.log(`로드 컴포넌트의 useEffect - targetMembers : ${targetMembers}`);

    targetMembers.forEach(async (memberId) => {
      if (!getPeer(memberId)) {
        await createPeerConnection(chatRoomId, memberId);
      }
    });
  }, [chatRoomVideoMembers, socket]); // peers 의존성 추가 필요한가?

  useEffect(() => {}, [peers]);

  // 컴포넌트 언마운트 시 모든 연결 해제
  useEffect(() => {
    return () => {
      closeAllConnections();
    };
  }, []);

  return null;
};

export default ChatRoomVideoLoadComponent2;