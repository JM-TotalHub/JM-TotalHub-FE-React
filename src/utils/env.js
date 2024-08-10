// config.js
// import dotenv from 'dotenv';
// dotenv.config(); // 환경 변수 로드

const isProd = process.env.REACT_APP_REACT_SERVER_ENV_STATUS === 'prod';

const ENV = {
  // Express 서버 api (배포: 엔진엑스 서버 / 개발: 로컬 시그널 서버)
  EXPRESS_SERVER_BASE_URL: isProd
    ? `http://${process.env.REACT_APP_NGINX_SERVER01_HOST}/api`
    : `http://${process.env.REACT_APP_EXPRESS_LOCAL_HOST}:${process.env.REACT_APP_EXPRESS_LOCAL_POST}`,

  SIGNAL_SERVER_SOCKET_BASE_URL: isProd
    ? `ws://${process.env.REACT_APP_NGINX_SERVER01_HOST}/signal/socket/`
    : `http://${process.env.REACT_APP_SIGNAL_LOCAL_HOST}:${process.env.REACT_APP_SIGNAL_LOCAL_POST}`,

  // 엔진엑스 서버
  REACT_APP_NGINX_SERVER01_HOST: process.env.REACT_APP_NGINX_SERVER01_HOST,
};

console.log('모든 환경 변수 출력:');
for (const key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    console.log(`${key}: ${process.env[key]}`);
  }
}

console.log('EXPRESS_SERVER_BASE_URL: ', ENV.EXPRESS_SERVER_BASE_URL);
console.log(
  'SIGNAL_SERVER_SOCKET_BASE_URL: ',
  ENV.SIGNAL_SERVER_SOCKET_BASE_URL
);

export default ENV;
