import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import useSWR from 'swr';

export default function useReplies(commentId, openReply) {
  async function getReplies(url, commentId) {
    const payload = { params: { commentId } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data, error, mutate } = useSWR(
    openReply ? [`${baseUrl}/api/reply`, commentId] : null,
    getReplies
  );

  let loading = !data;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
