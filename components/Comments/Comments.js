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
import CommentForm from './CommentForm';
import formatDateFromNow from '../../utils/formatDateFromNow';

const Comments = ({ comment }) => {
  const [openReply, setOpenReply] = useState(false);
  const [opneReplyForm, setOpenReplyForm] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleOpenReplyForm = () => {
    setOpenReplyForm(!opneReplyForm);
  };

  return (
    <>
      <Comment>
        <Comment.Avatar src={comment.user.profilePictureUrl} />
        <Comment.Content>
          <Comment.Author as="a">{comment.user.name}</Comment.Author>
          <Comment.Metadata>
            <div>{formatDateFromNow(comment.createdAt)}</div>
          </Comment.Metadata>
          <Comment.Text>{comment.text}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={() => handleOpenReplyForm()}>
              Reply
            </Comment.Action>
            <Comment.Action onClick={() => handleOpenReply()}>
              <Icon
                name="dropdown"
                rotated={openReply ? null : 'counterclockwise'}
              />
            </Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        {openReply && <Replies />}
        {opneReplyForm && <CommentForm content="Add Reply" />}
      </Comment>
    </>
  );
};

export default Comments;
