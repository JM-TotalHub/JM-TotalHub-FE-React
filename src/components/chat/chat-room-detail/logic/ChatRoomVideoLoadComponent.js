import React, { useEffect, useMemo } from 'react';
import { useSocket } from '../../../../utils/connections/SocketProvider';
import ChatRoomVideoEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomVideoEmitterHandler';
import WebRtcManager from '../../../../utils/connections/WebRtcManager';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomWebRtcSlice from '../../../../features/domains/chat/chat-room/slices/ChatRoomWebRtcSlice';

const ChatRoomVideoLoadComponent = ({ chatRoomId }) => {
  // 화상채팅방 들어갔다는
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const { peers } = useSelector((state) => state.chat.chatRoomWebRtcStatus);

  const { createPeerConnection, createOffer } = useMemo(() => {
    return WebRtcManager(socket, dispatch, peers);
  }, []);

  const { chatRoomVideoMembers } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  const { userInfo } = useSelector((state) => state.auth.userInfo);
  console.log('유저정보!!! : ', userInfo);

  console.log('webrtc 호출됨!!!');

  useEffect(() => {
    const { joinChatRoomVideo } = ChatRoomVideoEmitterHandler(socket);

    joinChatRoomVideo(chatRoomId);
  }, [socket]);

  useEffect(() => {
    // 나를 제외한 화상채팅 참가자 목록 가져오기
    console.log(`화상채팅 전체 인원 : `);
    console.log(chatRoomVideoMembers);

    // const { addPeer } = ChatRoomWebRtcSlice;

    const targetMembers = chatRoomVideoMembers
      .filter((member) => member.id !== userInfo.id)
      .map((member) => member.id);

    console.log(`@@@@@@@@@@@나 빼고 화상채팅 전체 인원 : `);
    console.log(targetMembers);

    // createPeerConnection(chatRoomId);
    // createOffer(chatRoomId);

    targetMembers.forEach((memberId) => {
      // const pc = createPeerConnection(chatRoomId, memberId);
      createPeerConnection(chatRoomId, memberId);
      // addPeer(memberId, pc);
      createOffer(peers, chatRoomId, memberId);
    });
  }, [chatRoomVideoMembers]);

  return;
};

export default ChatRoomVideoLoadComponent;
