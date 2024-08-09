import React from 'react';
import { htmlDecoder } from '../../../utils/form/htmlDecoder';

import { formatDateWithToday } from '../../../utils/form/dateFormat';

import { TableCell } from './styles/CommentListStyles';
import CommentUpdateComponent from './CommentUpdateComponent';

const CommentDetailsComponent = ({
  commentId,
  commentContent,
  commentCreatedAt,
}) => {
  if (typeof commentContent === 'string') {
    const decodedContent = htmlDecoder(commentContent);
    return (
      <>
        <TableCell>{commentId}</TableCell>
        <TableCell
          dangerouslySetInnerHTML={{ __html: decodedContent }}
        ></TableCell>
        <TableCell>{formatDateWithToday(commentCreatedAt)}</TableCell>
      </>
    );
  } else {
    return (
      <>
        <TableCell>{commentId}</TableCell>
        <TableCell>{commentContent}</TableCell>
        <TableCell>{formatDateWithToday(commentCreatedAt)}</TableCell>
      </>
    );
  }
};

export default CommentDetailsComponent;
