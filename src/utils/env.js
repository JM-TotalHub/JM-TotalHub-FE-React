// config.js
// import dotenv from 'dotenv';
// dotenv.config(); // 환경 변수 로드

const isProd = process.env.REACT_APP_REACT_SERVER_ENV_STATUS === 'prod';

const ENV = {
  // Express 서버 api (배포: 엔진엑스 서버 / 개발: 로컬 시그널 서버)
  // EXPRESS_SERVER_BASE_URL: isProd
  //   ? `http://${process.env.REACT_APP_REACT_SERVER01_EC2_HOST}/api`
  //   : `http://${process.env.REACT_APP_EXPRESS_LOCAL_HOST}:${process.env.REACT_APP_EXPRESS_LOCAL_POST}`,

  // SIGNAL_SERVER_SOCKET_BASE_URL: isProd
  //   ? `http://${process.env.REACT_APP_REACT_SERVER01_EC2_HOST}`
  //   : `http://${process.env.REACT_APP_SIGNAL_LOCAL_HOST}:${process.env.REACT_APP_SIGNAL_LOCAL_POST}`,

  // EXPRESS_SERVER_BASE_URL: isProd
  //   ? `https://${process.env.REACT_APP_REACT_SERVER01_EC2_HOST}/api` // HTTPS로 변경
  //   : `http://${process.env.REACT_APP_EXPRESS_LOCAL_HOST}:${process.env.REACT_APP_EXPRESS_LOCAL_POST}`,

  // SIGNAL_SERVER_SOCKET_BASE_URL: isProd
  //   ? `wss://${process.env.REACT_APP_REACT_SERVER01_EC2_HOST}` // WSS로 변경
  //   : `ws://${process.env.REACT_APP_SIGNAL_LOCAL_HOST}:${process.env.REACT_APP_SIGNAL_LOCAL_POST}`,

  EXPRESS_SERVER_BASE_URL: isProd
    ? `https://jmtotalhub.kro.kr/api` // 도메인 이름 사용
    : `http://${process.env.REACT_APP_EXPRESS_LOCAL_HOST}:${process.env.REACT_APP_EXPRESS_LOCAL_POST}`,

  SIGNAL_SERVER_SOCKET_BASE_URL: isProd
    ? `wss://jmtotalhub.kro.kr` // 도메인 이름 사용
    : `ws://${process.env.REACT_APP_SIGNAL_LOCAL_HOST}:${process.env.REACT_APP_SIGNAL_LOCAL_POST}`,

  // 엔진엑스 서버
  REACT_APP_NGINX_SERVER01_EC2_HOST:
    process.env.REACT_APP_NGINX_SERVER01_EC2_HOST,
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
