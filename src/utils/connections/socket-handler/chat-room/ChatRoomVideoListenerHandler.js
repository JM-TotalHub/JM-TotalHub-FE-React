import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWebRtc } from '../../../../components/chat/chat-room-detail/logic/ChatRoomVideoContext';
import {
  chatRoomVideoNewUserJoin,
  chatRoomVideoUserLeave,
  chatRoomVideoUsers,
} from '../../../../features/domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import { useSocket } from '../../SocketProvider';
import ChatRoomVideoEmitterHandler from './ChatRoomVideoEmitterHandler';
import {
  onChatRoomVideoData,
  onChatRoomVideoStarted,
} from '../../../../features/domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';

const ChatRoomVideoListenerHandler = ({ chatRoomId }) => {
  const { socket } = useSocket();
  const {
    peers,
    iceServers,
    addPeer,
    removePeer,
    getPeer,
    addStream,
    getStream,
    removeStream,
  } = useWebRtc();
  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { useChatRoom } = useSelector(
    (state) => state.chat.chatRoomMessageStatus
  );

  const dispatch = useDispatch();

  // ICE 후보를 저장할 큐
  const peerConnectionFlags = {};
  const iceCandidateQueue = {};

  useEffect(() => {
    if (!socket || !useChatRoom) return;

    socket.on('chat-room-video', handleMessageReceive);

    return () => {
      socket.off('chat-room-video', handleMessageReceive);
    };
  }, [socket, useChatRoom]);

  const handleMessageReceive = (data) => {
    switch (data.type) {
      case 'members':
        console.log(
          '이벤트 수신 / 화상 채팅 새로운 참가자 members 메시지:',
          data.members
        );
        handleVideoMembers(data);
        break;
      case 'member-join':
        console.log(
          '이벤트 수신 / 화상 채팅 새로운 참가자 members 메시지:',
          data.newMember
        );
        handleVideoNewMember(data);
        break;
      case 'member-leave':
        console.log(
          '이벤트 수신 / 화상 채팅 새로운 참가자 members 메시지:',
          data.newMember
        );
        handleVideoLeaveMember(data);
        break;
      case 'ice-candidate':
        console.log(
          `이벤트 수신 / 화상 채팅 이벤트 전송받음 ice-candidate => 발신자 : ${data.userId} & ice : ${data.ice} `
        );
        handleIceCandidate(data);
        break;
      case 'offer':
        console.log(
          `이벤트 수신 / 화상 채팅 이벤트 전송받음 offer => 발신자 : ${data.userId} & offer : ${data.offer} `
        );
        handleOffer(data);
        break;
      case 'answer':
        console.log(
          `이벤트 수신 / 화상 채팅 이벤트 전송받음 answer => 발신자 : ${data.userId} & answer : ${data.answer} `
        );
        handleAnswer(data);
        break;
      default:
        console.log('알 수 없는 데이터 타입:', data);
    }
  };

  // 기존 화상채팅 유저 리스트 받아오기
  // 이건 처음 들어와서 처음만 동작
  const handleVideoMembers = async (data) => {
    console.log(`소캣 리스너 화상학습 handleJoinVideoSuccess 동작 `);

    dispatch(chatRoomVideoUsers(data.members));
    dispatch(onChatRoomVideoData());
  };

  const handleVideoNewMember = (data) => {
    console.log(`소캣 리스너 화상학습 handleVideoNewMember 동작 `);

    dispatch(onChatRoomVideoStarted());
    dispatch(chatRoomVideoNewUserJoin(data.newMember));
  };

  const handleVideoLeaveMember = (data) => {
    console.log(`소캣 리스너 화상학습 handleVideoLeaveMember 동작 `);

    dispatch(chatRoomVideoUserLeave(data.userId));
    removePeer(data.userId);
    removeStream(data.userId);
    delete peerConnectionFlags[data.userId];
  };

  // ICE 후보 처리
  const handleIceCandidate = async (data) => {
    if (userInfo.id === data.userId) return;

    console.log(`소캣 리스너 화상학습 handleIceCandidate 동작 `);

    let pc = getPeer(data.userId);

    // 플래그로 피어 연결 생성 중인지 확인
    if (!pc && !peerConnectionFlags[data.userId]) {
      peerConnectionFlags[data.userId] = true; // pc 객체 생성 중
      pc = await createPeerConnection(chatRoomId, data.userId);
      console.log(`handleOffer pc 생성 01 : ${pc}`);
    } else if (!pc) {
      // 피어 연결이 아직 생성되지 않았으면 대기
      await delay(500); // 200ms 대기

      pc = getPeer(data.userId); // 다시 pc 확인
      if (!pc) {
        console.error(`피어 연결을 생성하는 데 실패했습니다1: ${data.userId}`);
        return;
      }
    }

    // remoteDescription이 아직 설정되지 않았다면 ICE 후보를 큐에 저장
    if (!pc.remoteDescription || !pc.remoteDescription.type) {
      console.log(
        'remoteDescription이 아직 설정되지 않았으므로 ICE 후보를 큐에 저장합니다.'
      );

      if (!iceCandidateQueue[data.userId]) {
        iceCandidateQueue[data.userId] = [];
      }
      iceCandidateQueue[data.userId].push(data.ice);
    } else {
      // remoteDescription이 설정되었다면 ICE 후보를 추가
      try {
        console.log('ICE 후보 추가 중:', data.ice);
        await pc.addIceCandidate(new RTCIceCandidate(data.ice));
      } catch (error) {
        console.error('ICE 후보 추가 중 오류 발생:', error);
      }
    }
  };

  const handleOffer = async (data) => {
    if (userInfo.id === data.userId) return;

    console.log(`소캣 리스너 화상학습 handleOffer 동작 `);

    let pc = getPeer(data.userId);

    // 플래그로 피어 연결 생성 중인지 확인
    if (!pc && !peerConnectionFlags[data.userId]) {
      peerConnectionFlags[data.userId] = true; // 플래그 설정
      pc = await createPeerConnection(chatRoomId, data.userId);
      console.log(`handleOffer pc 생성 02 : ${pc}`);
    } else if (!pc) {
      // 피어 연결이 아직 생성되지 않았으면 대기
      await delay(500); // 200ms 대기
      pc = getPeer(data.userId); // 다시 pc 확인
      if (!pc) {
        console.error(`피어 연결을 생성하는 데 실패했습니다2: ${data.userId}`);
        return;
      }
    }

    try {
      console.log('setRemoteDescription 동작 - handleOffer');

      await pc.setRemoteDescription(new RTCSessionDescription(data.offer)); // 비동기 처리
      const answer = await pc.createAnswer(); // 비동기 처리
      await pc.setLocalDescription(answer); // 비동기 처리

      const { sendAnswer } = ChatRoomVideoEmitterHandler(socket);
      console.log(`handleOffer의 생성된 answer`);
      console.log(answer);

      sendAnswer(chatRoomId, userInfo.id, data.userId, answer); // answer 전송

      // ICE 후보 처리
      console.log(
        `handleOffer에서 iceCandidateQueue확인 ${iceCandidateQueue[data.userId]}`
      );

      if (iceCandidateQueue[data.userId]) {
        console.log('ICE 후보 추가 중:', data.ice);
        while (iceCandidateQueue[data.userId].length > 0) {
          const ice = iceCandidateQueue[data.userId].shift();
          await pc.addIceCandidate(new RTCIceCandidate(ice));
        }
      }
    } catch (error) {
      console.error('handleOffer 중 오류 발생:', error);
    }
  };

  const handleAnswer = async (data) => {
    if (userInfo.id === data.userId) return;

    console.log(`소캣 리스너 화상학습 handleAnswer 동작 `);
    console.log(data);

    let pc = getPeer(data.userId);

    if (!pc) {
      pc = await createPeerConnection(chatRoomId, data.userId);
      console.log(`handleAnswer pc 생성 01 : ${pc}`);
    }

    try {
      console.log('setRemoteDescription 동작 - handleAnswer');

      await pc.setRemoteDescription(new RTCSessionDescription(data.answer)); // 비동기 처리

      // ICE 후보 처리
      if (iceCandidateQueue[data.userId]) {
        console.log('큐에 저장된 ICE 후보 처리');
        while (iceCandidateQueue[data.userId].length > 0) {
          const ice = iceCandidateQueue[data.userId].shift();
          await pc.addIceCandidate(new RTCIceCandidate(ice));
        }
      }
    } catch (error) {
      console.error('handleAnswer 중 오류 발생:', error);
    }
  };

  const createPeerConnection = async (chatRoomId, targetUserId) => {
    console.log(`createPeerConnection로 피어 생성 및 이벤트 등록`);

    if (getPeer(targetUserId)) {
      console.log(`피어가 이미 존재합니다: ${targetUserId}`);
      return getPeer(targetUserId); // 기존 피어를 반환
    }

    const pc = new RTCPeerConnection(iceServers);

    const { sendIceCandidate } = ChatRoomVideoEmitterHandler(socket);

    const localStream = getStream(userInfo.id);

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    const sentCandidates = new Set();

    pc.onicecandidate = (event) => {
      if (event.candidate && !sentCandidates.has(event.candidate.candidate)) {
        console.log(`onicecandidate 동작 : ${event.candidate.candidate}`);
        sendIceCandidate(chatRoomId, userInfo.id, event.candidate);
        sentCandidates.add(event.candidate.candidate);
      }
    };

    pc.ontrack = (event) => {
      console.log(`ontrack 동작 - 리스너`);
      const remoteStream = event.streams[0];

      if (remoteStream) {
        console.log('원격 스트림 수신 성공', remoteStream);
        console.log('비디오 트랙:', remoteStream.getVideoTracks());
        console.log('오디오 트랙:', remoteStream.getAudioTracks());
        addStream(targetUserId, remoteStream); // 원격 스트림 저장
      } else {
        console.error('원격 스트림 수신 실패');
      }
    };

    await addPeer(targetUserId, pc);

    return pc;
  };

  // 특정 시간(밀리초) 동안 대기하는 함수
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return null;
};

export default ChatRoomVideoListenerHandler;
