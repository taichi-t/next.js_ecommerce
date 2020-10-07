import Replies from './Replies';
import CommentForm from './CommentForm';
import useReplies from '../../hooks/useReplies';

const RepliesContainer = ({ commentId, openReply, openReplyForm }) => {
  const { data, loading, mutate } = useReplies(commentId, openReply);

  return (
    <>
      {openReply && <Replies data={data} loading={loading} />}
      {openReplyForm && (
        <CommentForm
          content="Add Reply"
          action="reply"
          prop="replies"
          refId={commentId}
          _data={data}
          mutate={mutate}
        />
      )}
    </>
  );
};

export default RepliesContainer;
