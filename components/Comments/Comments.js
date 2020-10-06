import React, { useState } from 'react';
import {
  Accordion,
  Button,
  Comment,
  Form,
  Header,
  Icon,
} from 'semantic-ui-react';

import Replies from './Replies';

const Comments = ({ comment, index }) => {
  const [open, setOpen] = useState(false);
  const handleClick = (e) => {
    setOpen(!open);
  };

  return (
    <>
      <Comment key={index}>
        <Comment.Avatar src="/images/anonymous-user.png" />
        <Comment.Content>
          <Comment.Author as="a">Matt</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
            <Comment.Action onClick={(e) => handleClick(e)}>
              <Icon
                name="dropdown"
                rotated={open ? null : 'counterclockwise'}
              />
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        {open && <Replies />}
      </Comment>
    </>
  );
};

export default Comments;
