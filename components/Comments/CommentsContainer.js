import React, { useState } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import Comments from './Comments';

const Container = () => {
  const comments = [{}, {}];

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {comments ? (
        comments.map((comment, index) => (
          <Comments comment={comment} index={index} />
        ))
      ) : (
        <Skeleton count={5} />
      )}
      <Form reply>
        <Form.TextArea />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
};

export default Container;
