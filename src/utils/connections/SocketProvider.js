import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import ENV from '../env';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // 이걸로 적용해야지 소캣 연결 전, 연결 후 소캣값 변경에 대한 내용이 전파됨
  // 그리고 이걸로 웹페이지를 나가거나, f5 등으로 다시 접근시(Dom초기화 => 기존 것 언마운트) 언마운트 되니 이전 연결 끊는다.
  const [socket, setSocket] = useState(null);

  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  useEffect(() => {
    // 소캣 연결 시도
    const connectedSocket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    // 소캣 연결 됨
    connectedSocket.on('connect', () => {
      console.log('Connected to signal server : ', connectedSocket.id);
      setSocket(connectedSocket);
    });

    // 소캣 연결 시도 에러 발생
    connectedSocket.on('connect_error', (err) => {
      console.log(err.message);
      console.log(err.description);
      console.log(err.context);
    });
    // 언마운트 시 소캣 연결 끊음
    return () => {
      connectedSocket.disconnect();
    };
  }, []);

  const joinRoom = (roomName) => {
    if (socket) {
      socket.emit(`join-${roomName}`);
      console.log(`${roomName} 방을 생성했습니다.`);
    }
  };

  const leaveRoom = (roomName, reason = '그냥') => {
    if (socket) {
      socket.emit(`leave-${roomName}`);
      console.log(`${roomName} 방을 나갔습니다. 이유:`, reason);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, joinRoom, leaveRoom }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
