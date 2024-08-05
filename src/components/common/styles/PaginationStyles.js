import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const PageButton = styled.button`
  margin: 0 0.2rem;
  padding: 0.5rem 0.8rem;

  border: 0.15rem solid #ccc;

  color: ${(props) => (props.active === 'true' ? '#fff' : '#000')};

  background-color: ${(props) =>
    props.active === 'true' ? 'RGBA(148,177,219,1)' : '#fff'};
  cursor: pointer;

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    padding: 0.2rem 0.3rem; /* 작은 화면에서 버튼 크기 조정 */
    font-size: 0.7rem; /* 작은 화면에서 폰트 크기 조정 */
    margin: 0.1rem; /* 작은 화면에서 버튼 간격 조정 */
  }
`;
