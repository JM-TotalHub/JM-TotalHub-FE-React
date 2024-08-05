import { createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import api from '../../../../utils/connections/api';

const CommentDeleteByCommentId = createAsyncThunk(
  'comment/CommentDeleteByCommentId',
  async ({ commentId }) => {
    await api.delete(`boards/comments/${commentId}`);
  }
);

export default CommentDeleteByCommentId;
