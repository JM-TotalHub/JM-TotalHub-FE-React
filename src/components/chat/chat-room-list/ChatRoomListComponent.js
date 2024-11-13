import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import chatRoomListByNothing from '../../../features/domains/chat/chat-room/actions/ChatRoomListAction';
import useMediaDevice from '../../config/useMediaDevice';
import {
  StChatRoomItem,
  StChatRoomListContainer,
} from './styles/ChatRoomListStyles';
import Pagination from '../../common/Pagination';
import api from '../../../utils/connections/api';

const ChatRoomListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const device = useMediaDevice();

  // const { chatRoomList, newChatRoom, status, error } = useSelector(
  //   (state) => state.chat.chatRoomList
  // );

  const [chatRoomList, setChatRoomList] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const totalPage = parseInt(searchParams.get('total-page')) || 1;
  const dataPerPage = parseInt(searchParams.get('dataPerPage')) || 10;
  const searchType = searchParams.get('search-type') || 'title';
  const searchText = searchParams.get('search-text') || ' ';
  const sortField = searchParams.get('sort-field') || 'created_at';
  const sortOrder = searchParams.get('sort-order') || 'desc';
  const roomType = searchParams.get('room-type') || 'total';

  useEffect(() => {
    const fetchChatRoomList = async () => {
      const response = await api.get(`/chats/chat-rooms`, {
        params: {
          pageNum: currentPage,
          dataPerPage: dataPerPage,
          searchType: searchType,
          searchText: searchText,
          sortField: sortField,
          sortOrder: sortOrder,
          roomType: roomType,
        },
      });
      setChatRoomList(response.data.chatRoomList);
      console.log(response);
    };

    fetchChatRoomList();
  }, []);

  const handleChatRoomClick = (chatRoomId) => {
    navigate(`/chats/chat-rooms/${chatRoomId}`);
  };

  const handlePageNum = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  const handleRoomType = (event) => {
    setSearchParams({
      ...Object.fromEntries(searchParams), // 기존 파라미터 유지
      'room-type': event.target.value, // 새로운 정렬 기준 추가
    });
  };

  return (
    <StChatRoomListContainer device={device}>
      {/* 정렬 기준 - 일단은 작성일 기준으로먄  */}
      <select value={roomType} onChange={handleRoomType}>
        <option value="total">전체</option>
        <option value="public">공개방</option>
        <option value="private">비밀방</option>
      </select>

      {chatRoomList.map((chatRoom) => (
        <StChatRoomItem
          key={chatRoom.id}
          onClick={() => handleChatRoomClick(chatRoom.id)}
        >
          <p>{chatRoom.id}</p>
          <h3>{chatRoom.name}</h3>
          <p>{chatRoom.description}</p>
        </StChatRoomItem>
      ))}

      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageNum}
      />
    </StChatRoomListContainer>
  );
};

export default ChatRoomListComponent;
