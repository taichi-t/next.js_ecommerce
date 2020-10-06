import React, { useState } from 'react';
import { Comment, Header, Divider } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import Comments from './Comments';
import CommentForm from './CommentForm';

const Container = ({ productId }) => {
  const comments = [{}, {}];

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments ? (
        comments.map((comment, index) => (
          <Comments comment={comment} index={index} key={index} />
        ))
      ) : (
        <Skeleton count={5} />
      )}
      <Divider />
      <CommentForm content="Add Comment" refId={productId} />
    </Comment.Group>
  );
};

export default Container;
