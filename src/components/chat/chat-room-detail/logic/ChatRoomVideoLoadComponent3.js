import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';
import { useSocket } from '../../../../utils/connections/SocketProvider';
// 이거 일단 기본 동작 되는거임 고치지 마셈
const ChatRoomVideoLoadComponent3 = ({ chatRoomId }) => {
  const { socket } = useSocket();
  const { chatRoomVideoMembers } = useSelector(
    (state) => state.chat.chatRoomDetails
  );
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const [peers, setPeers] = useState({}); // 로컬 상태로 peers 관리

  console.log('유저정보!!! : ', userInfo);
  console.log('webrtc 호출됨!!!');
  console.log(peers);

  // ice 서버 설정
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' }, // Google STUN 서버
      // { urls: 'stun:stun1.l.google.com:19302' }, // 추가 Google STUN 서버
      // { urls: 'stun:stun2.l.google.com:19302' }, // 추가 Google STUN 서버
      // { urls: 'stun:stun3.l.google.com:19302' }, // 추가 Google STUN 서버
      // { urls: 'stun:stun4.l.google.com:19302' }, // 추가 Google STUN 서버
    ],
  };

  // 클라이언트가 상대(userId)를 위한 pc 객체 생성 및 등록
  const createPeerConnection = async (chatRoomId, userId) => {
    console.log(`createPeerConnection 호출됨`);
    console.log(peers);

    if (peers[userId]) {
      console.log(`피어가 이미 존재합니다: ${userId}`);
      // return peers[userId];
    }

    const { sendIceCandidate } = ChatRoomVideoEmitterHandler(socket);

    const pc = new RTCPeerConnection(iceServers);
    if (!pc) {
      console.error('RTCPeerConnection 생성 실패');
      return;
    }
    console.log('RTCPeerConnection 생성 성공: ', pc);

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    // 혹시모를 중복 ICE 후보 추적 구분을 위한 Set
    const sentCandidates = new Set();

    // ICE 후보 수집 이벤트 등록
    pc.onicecandidate = (event) => {
      console.log(`onicecandidate 동작`);

      // 이벤트 유무 & ice 후보 중복 확인 후 메시지 보내기
      if (event.candidate && !sentCandidates.has(event.candidate.candidate)) {
        console.log(`새로운 ICE 후보 전송: ${event.candidate.candidate}`);
        sendIceCandidate(chatRoomId, userId, event.candidate);
        sentCandidates.add(event.candidate.candidate); // 후보 추적
      }
    };

    // ICE 후보 변경 이벤트
    pc.onicegatheringstatechange = () => {
      console.log(`ICE gathering state: ${pc.iceGatheringState}`);
    };

    // 스트림 연결 이벤트 등록
    pc.ontrack = (event) => {
      console.log(`ontrack 동작`);
      const remoteStream = event.streams[0];
    };

    // 상태에 피어 등록 및 Offer 생성 대기
    setPeers((prevPeers) => {
      const updatedPeers = { ...prevPeers, [userId]: pc };

      // 피어가 업데이트된 후 Offer를 생성
      createOffer(chatRoomId, userId, updatedPeers);

      return updatedPeers;
    });

    return pc;
  };

  // offer 생성 및 offer 전달
  const createOffer = async (chatRoomId, userId, currentPeers) => {
    console.log(`createOffer 동작`);
    console.log(currentPeers);

    const { sendOffer } = ChatRoomVideoEmitterHandler(socket);
    const pc = currentPeers[userId];

    if (!pc) {
      console.log(`피어 연결이 없습니다: ${userId}`);
      return;
    }

    // const offer = await pc.createOffer();
    // await pc.setLocalDescription(offer);

    // sendOffer(userId, offer);

    try {
      // Offer 생성
      const offer = await pc.createOffer();
      console.log('Offer 생성 완료:', offer);

      // LocalDescription 설정
      await pc.setLocalDescription(offer);
      console.log('LocalDescription 설정 완료:', pc.localDescription);

      // Offer 전송
      sendOffer(chatRoomId, userId, offer);
      console.log(`Offer 전송 완료: userId => ${userId}`);
    } catch (error) {
      console.error('Offer 생성 또는 전송 중 오류 발생:', error);
    }
  };

  // 피어 연결 해제 및 정리
  const closeAllConnections = () => {
    Object.values(peers).forEach((pc) => {
      if (pc) {
        pc.close();
      }
    });
    setPeers({});
  };

  // 컴포넌트 언마운트 시 피어 연결 정리
  useEffect(() => {
    return () => {
      closeAllConnections();
    };
  }, []);

  // 화상채팅방 참가
  useEffect(() => {
    const { joinChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
    joinChatRoomVideo(chatRoomId);

    // 컴포넌트가 언마운트 될 때 퇴장 로직 추가
    return () => {
      const { leaveChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);
      leaveChatRoomVideo(chatRoomId);
    };
  }, [socket, chatRoomId]);

  // webrtc 관련
  useEffect(() => {
    console.log(`연결 useEffect 동작`);
    console.log(chatRoomVideoMembers);
    if (!chatRoomVideoMembers) {
      return;
    }

    // 대상 멤버들을 필터링 후 피어 생성 및 Offer 전송
    const targetMembers = chatRoomVideoMembers
      .filter((member) => member.id !== userInfo.id)
      .map((member) => member.id);

    targetMembers.forEach(async (memberId) => {
      if (!peers[memberId]) {
        await createPeerConnection(chatRoomId, memberId);
      }
    });
  }, [chatRoomVideoMembers, peers]);

  return null;
};

export default ChatRoomVideoLoadComponent3;
