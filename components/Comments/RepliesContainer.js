import Replies from './Replies';
import CommentForm from './CommentForm';

const RepliesContainer = ({
  commentId,
  openReply,
  openReplyForm,
  setOpenReplyForm,
  setOpenReply,
}) => {
  return (
    <>
      {openReply && <Replies commentId={commentId} />}
      {openReplyForm && (
        <CommentForm
          content="Add Reply"
          action="reply"
          prop="replies"
          refId={commentId}
        />
      )}
    </>
  );
};

export default RepliesContainer;
