import { Comment, Loader } from 'semantic-ui-react';
import formatDateFromNow from '../../utils/formatDateFromNow';

const Replies = ({ data, loading }) => {
  return (
    <>
      <Comment.Group>
        {loading ? (
          <Loader active inline="centered" />
        ) : data && data.replies ? (
          data.replies.map((reply) => (
            <Comment key={reply._id}>
              <Comment.Avatar src={reply.user.profilePicture.url} />
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
    </>
  );
};

export default Replies;
