import React, { useState, useContext } from 'react';
import Replies from './Replies';
import useReplies from '../../hooks/useReplies';
import cookie from 'js-cookie';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import useTextForm from '../../hooks/useTextForm';
import TextForm from './TextForm';
import { UserContext } from '../../utils/UserProvider';

const RepliesContainer = ({ commentId, openReply, openReplyForm }) => {
  const { onChange, text, setText } = useTextForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const { data: result, loading: repliesLoading, mutate } = useReplies(
    commentId,
    openReply
  );

  async function onSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const token = cookie.get('token');
      const payload = { text, commentId };
      const headers = {
        headers: {
          Authorization: token,
        },
      };
      const url = `${baseUrl}/api/reply`;
      const response = await axios.post(url, payload, headers);
      const changedValue = response.data.replies.slice(-1)[0];
      mutate({
        ...result.data,
        replies: result.data.replies.concat(changedValue),
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
    <>
      {openReply && <Replies data={result.data} loading={repliesLoading} />}
      {openReplyForm && (
        <TextForm
          onSubmit={onSubmit}
          onChange={onChange}
          loading={loading}
          user={user}
          content="reply"
          text={text}
        />
      )}
    </>
  );
};

export default RepliesContainer;
