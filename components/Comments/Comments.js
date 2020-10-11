import React, { useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import formatDateFromNow from '../../utils/formatDateFromNow';
import RepliesContainer from './RepliesContainer';

const Comments = ({ comment }) => {
  const [openReply, setOpenReply] = useState(false);
  const [openReplyForm, setOpenReplyForm] = useState(false);

  const handleOpenReply = () => {
    setOpenReply(!openReply);
  };

  const handleOpenReplyForm = () => {
    setOpenReplyForm(!openReplyForm);
  };

  return (
    <>
      <Comment>
        <Comment.Avatar src={comment.user.profilePicture.url} />
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

        <RepliesContainer
          commentId={comment._id}
          openReply={openReply}
          openReplyForm={openReplyForm}
        />
      </Comment>
    </>
  );
};

export default Comments;
