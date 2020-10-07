import { Button, Comment, Form, Header, Loader } from 'semantic-ui-react';
import useReplies from '../../hooks/useReplies';
import formatDateFromNow from '../../utils/formatDateFromNow';
import CommentForm from './CommentForm';

const Replies = ({ commentId, openReplyForm, setOpenReplyForm }) => {
  const { data, loading } = useReplies(commentId);

  return (
    <>
      <Comment.Group>
        {loading ? (
          <Loader active inline="centered" />
        ) : data && data.replies ? (
          data.replies.map((reply) => (
            <Comment key={reply._id}>
              <Comment.Avatar src={reply.user.profilePictureUrl} />
              <Comment.Content>
                <Comment.Author as="a">{reply.user.name}</Comment.Author>
                <Comment.Metadata>
                  {formatDateFromNow(reply.createdAt)}
                </Comment.Metadata>
                <Comment.Text>{reply.text}</Comment.Text>
              </Comment.Content>
            </Comment>
          ))
        ) : (
          <div>There is no replies.</div>
        )}
      </Comment.Group>
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

export default Replies;
