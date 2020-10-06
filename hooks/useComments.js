import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import cookie from 'js-cookie';
import useSWR from 'swr';
import { useEffect, useRef } from 'react';

export default function useComments(productId) {
  async function getComments(url) {
    const token = cookie.get('token');
    const payload = { params: { productId } };
    const response = await axios.get(url, payload);
    return response.data;
  }
  const { data: comments, error, mutate } = useSWR(
    `${baseUrl}/api/comment`,
    getComments
  );

  let loading = !comments && !error;

  return {
    comments,
    error,
    loading,
    mutate,
  };
}
