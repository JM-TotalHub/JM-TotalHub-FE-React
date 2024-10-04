import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import ENV from '../env';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // 이걸로 적용해야지 소캣 연결 전, 연결 후 소캣값 변경에 대한 내용이 전파됨
  // 그리고 이걸로 웹페이지를 나가거나, f5 등으로 다시 접근시(Dom초기화 => 기존 것 언마운트) 언마운트 되니 이전 연결 끊는다.
  const [socket, setSocket] = useState(null);
  const { status } = useSelector((state) => state.auth.signIn);
  const { accessToken } = useSelector((state) => state.auth.authStatus);

  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  useEffect(() => {
    console.log(
      `소캣 연결 시도!!! signIn-status : ${status}, accessToken : ${accessToken}`
    );

    if ((status !== 'idle' && status !== 'succeeded') || !accessToken) {
      console.log(
        `소캣 연결 시도!!! 하지만 하면 안됨 if문 signIn-status : ${status}, accessToken : ${accessToken}`
      );
      return;
    }

    console.log(
      `실제 소캣 연결 시도!!! signIn-status : ${status}, accessToken : ${accessToken}`
    );

    // 소켓이 이미 연결된 상태라면, 재연결을 하지 않도록 조건부로 처리
    if (socket && socket.connected && accessToken) {
      console.log('소켓이 이미 연결됨, 중복 연결 방지');
      return;
    }

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
  }, [status, accessToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
