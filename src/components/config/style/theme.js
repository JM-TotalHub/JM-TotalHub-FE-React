// 이곳에서 CSS 관련해서 공통적으로 사용하는 요소 및 수치들을 종합 관리한다.

const screenSizes = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px',
};

const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#ccc',
    headerBg: '#526d82',
    textWhite: '#ffffff',
    textGray: '#7e7e7e',
  },
  screenSizes,
  mediaQueries: {
    mobile: `(max-width: ${screenSizes.mobile})`,
    tablet: `(min-width: ${screenSizes.mobile}) and (max-width: ${screenSizes.desktop})`,
    desktop: `(min-width: ${screenSizes.desktop})`,
  },
};

export default theme;
