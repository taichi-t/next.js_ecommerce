import React, { useState, useContext } from 'react';
import { Comment, Header, Divider } from 'semantic-ui-react';
import Skeleton from 'react-loading-skeleton';
import Comments from './Comments';
import useComments from '../../hooks/useComments';
import useTextForm from '../../hooks/useTextForm';
import TextForm from './TextForm';
import { UserContext } from '../../utils/UserProvider';
import cookie from 'js-cookie';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';

const CommentsContainer = ({ productId }) => {
  const { onChange, text, setText } = useTextForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { data: result, loading: commentsLoading, mutate } = useComments(
    productId
  );

  async function onSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const token = cookie.get('token');
      const payload = { text, productId };
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      const url = `${baseUrl}/api/comment`;
      const response = await axios.post(url, payload, headers);
      console.log(response);
      const changedValue = response.data.comments.slice(-1)[0];
      mutate({
        ...result,
        ...result.data,
        comments: result.data.comments.concat(changedValue),
      });
      setText('');
      setLoading(false);
    } catch (error) {
      console.error('ERROR!', error);
    } finally {
      setText('');
      setLoading(false);
    }
  }
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {commentsLoading ? (
        <Skeleton count={5} />
      ) : result.data && result.data.comments.length > 0 ? (
        result.data.comments.map((comment) => (
          <Comments comment={comment} key={comment._id} />
        ))
      ) : (
        <div>There is no comments.</div>
      )}
      <Divider />
      <TextForm
        onSubmit={onSubmit}
        onChange={onChange}
        loading={loading}
        user={user}
        content="comment"
        text={text}
      />
    </Comment.Group>
  );
};

export default CommentsContainer;
