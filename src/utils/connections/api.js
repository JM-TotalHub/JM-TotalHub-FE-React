import axios from 'axios';
import ENV from '../env';

const api = axios.create({
  baseURL: ENV.EXPRESS_SERVER_BASE_URL,
  withCredentials: true,
});

// 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    console.log('요청 URL:', config.url); // 요청 URL 로그 출력
    return config;
  },
  (error) => {
    if (error.config) {
      console.log('비정상요청 URL:', error.config.url); // 요청 URL 로그 출력
    }
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.data.err);
    const originalRequest = error.config;

    if (
      error.response.data.err === 'TokenExpiredError' &&
      !originalRequest._retry
    ) {
      console.log('api 요청에서 토큰 만료');

      originalRequest._retry = true;

      try {
        await axios.post(
          `${ENV.EXPRESS_SERVER_BASE_URL}/auth/new-token`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log('api 요청에서 토큰 재발행 완료');

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
