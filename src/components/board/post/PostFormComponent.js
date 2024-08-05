import React, { useEffect, useState } from 'react';
import QuillEditor from '../../common/QuillEditor';

import {
  Container,
  TitleInput,
  ContentContainer,
  Form,
} from './styles/PostCreateStyles';
import {
  BoardButton,
  ButtonContainer,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

const PostFormComponent = ({
  inItTitle = '',
  inItContent = '',
  onSubmit,
  status,
  error,
}) => {
  const [title, setTitle] = useState(inItTitle);
  const [content, setContent] = useState(inItContent);

  useEffect(() => {
    setTitle(inItTitle);
  }, [inItTitle]);

  useEffect(() => {
    setContent(inItContent);
  }, [inItContent]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    console.log('저장버튼!!!');
    e.preventDefault();
    onSubmit({ title, content });
  };

  if (status === 'loading') {
    return <div>Loading... 데이터를 저장하고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 저장하지 못했습니다.</div>;
  }

  return (
    <Container>
      <TitleInput
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="제목을 입력하세요"
      />
      <Form onSubmit={handleSubmit}>
        <QuillEditor
          value={content}
          onChange={handleContentChange}
          editorStyle={{ marginBottom: '3rem' }}
          quillStyle={{ height: '30rem' }}
        />
        <ButtonContainer>
          <RightButtonGroup>
            <BoardButton type="submit">저장</BoardButton>
          </RightButtonGroup>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default PostFormComponent;
