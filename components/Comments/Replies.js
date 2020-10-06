import React, { useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Loader } from 'semantic-ui-react';

const ProductReplies = () => {
  const [replies, setReplies] = useState();
  useEffect(() => {}, []);
  return replies ? (
    replies.map((reply) => (
      <Comment.Group>
        <Comment>
          <Comment.Avatar src="/images/anonymous-user.png" />
          <Comment.Content>
            <Comment.Author as="a">Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    ))
  ) : (
    <Loader active inline="centered" />
  );
};

export default ProductReplies;
