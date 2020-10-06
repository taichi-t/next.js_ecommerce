import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';
import { useEffect, useRef } from 'react';

export default function useComments(productId) {
  async function getComments(url) {
    const payload = { params: { productId } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data, error, mutate } = useSWR(`${baseUrl}/api/comment`, getComments);

  let loading = !data && !error;

  return {
    data,
    error,
    loading,
    mutate,
  };
}
