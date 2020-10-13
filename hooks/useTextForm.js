import { useState } from 'react';

export default function useTextForm() {
  const [text, setText] = useState('');
  function onChange(e) {
    const { value } = e.target;
    setText(value);
  }

  return { onChange, text, setText };
}
