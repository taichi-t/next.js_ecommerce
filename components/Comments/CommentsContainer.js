import React, { useState } from 'react';
import { Comment, Header, Divider } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import useComments from '../../hooks/useComments';

const Container = ({ productId }) => {
  const { data, loading, mutate } = useComments(productId);

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {loading ? (
        <Skeleton count={5} />
      ) : data && data.comments ? (
        data.comments.map((comment) => (
          <Comments comment={comment} key={comment._id} />
        ))
      ) : (
        <div>There is no comments</div>
      )}
      <Divider />
      <CommentForm
        content="Add Comment"
        refId={productId}
        mutate={mutate}
        _data={data}
      />
    </Comment.Group>
  );
};

export default Container;
