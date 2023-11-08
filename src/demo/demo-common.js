import React from 'react';

export default function common() {
  const showModal = false;
  return <div>{showModal && 'hello'}</div>;
}
