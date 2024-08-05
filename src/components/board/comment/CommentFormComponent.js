import React, { useEffect, useState } from 'react';
import QuillEditor from '../../common/QuillEditor';
import {
  ButtonContainer,
  BoardButton,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

const CommentFormComponent = ({
  initContent = '',
  onSubmit,
  status,
  error,
}) => {
  const [content, setContent] = useState(initContent);

  useEffect(() => {
    setContent(initContent);
  }, [initContent]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ content });
    setContent(''); // 제출 후 내용 초기화
  };

  if (status === 'loading') {
    return <div>Loading... 데이터를 저장하고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 저장하지 못했습니다.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <QuillEditor
        value={content}
        onChange={handleContentChange}
        modules={{ toolbar: false }}
        style={{ hight: '5rem' }}
      />
      <ButtonContainer>
        <RightButtonGroup>
          {(initContent !== null) & (initContent !== '') ? (
            <BoardButton type="submit">댓글수정</BoardButton>
          ) : (
            <BoardButton type="submit">댓글작성</BoardButton>
          )}
        </RightButtonGroup>
      </ButtonContainer>
    </form>
  );
};

export default CommentFormComponent;
