import axios from 'axios';

const ENV = process.env.REACT_APP_ENV_STATUS;

// const PROTOCOL = ENV === 'prod' ? 'https' : 'http';
const PROTOCOL = 'http';
const SERVER_IP =
  ENV === 'prod'
    ? process.env.REACT_APP_NGINX_SERVER_HOST
    : process.env.REACT_APP_EXPRESS_SERVER01_HOST;
const API_URL = `${PROTOCOL}://${SERVER_IP}`;
const BASE_URL = ENV === 'prod' ? `${API_URL}/api` : `${API_URL}`;

// 환경 변수와 SERVER_IP 값을 콘솔에 출력
console.log('환경 변수 REACT_APP_ENV_STATUS:', ENV);
console.log(
  '환경 변수 REACT_APP_NGINX_SERVER_HOST:',
  process.env.REACT_APP_NGINX_SERVER_HOST
);
console.log(
  '환경 변수 REACT_APP_EXPRESS_SERVER01_HOST:',
  process.env.REACT_APP_EXPRESS_SERVER01_HOST
);
console.log('SERVER_IP:', SERVER_IP);
console.log('API_URL:', API_URL);
console.log('BASE_URL:', BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    console.log('정상요청');
    console.log('요청 URL:', config.url); // 요청 URL 로그 출력
    console.log('요청 메서드:', config.method); // 요청 메서드 로그 출력
    console.log('요청 헤더:', config.headers); // 요청 헤더 로그 출력
    console.log('요청 데이터:', config.data); // 요청 데이터 로그 출력 (POST, PUT 등)
    return config;
  },
  (error) => {
    console.log('비정상요청');
    if (error.config) {
      console.log('비정상요청 URL:', error.config.url); // 요청 URL 로그 출력
      console.log('비정상요청 메서드:', error.config.method); // 요청 메서드 로그 출력
      console.log('비정상요청 헤더:', error.config.headers); // 요청 헤더 로그 출력
      console.log('비정상요청 데이터:', error.config.data); // 요청 데이터 로그 출력 (POST, PUT 등)
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('정상');
    return response;
  },
  async (error) => {
    console.log(error.response.data.err);
    const originalRequest = error.config;
    console.log('원래 요청 : ', originalRequest);

    if (
      error.response.data.err === 'TokenExpiredError' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${BASE_URL}/auth/new-token`,
          {},
          {
            withCredentials: true,
          }
        );

        return api(originalRequest);
      } catch (refreshError) {
        console.log('토큰 갱신 실패', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
