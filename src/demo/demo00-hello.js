import React from 'react';

function Hello() {
  return <h2>Hello World!</h2>;
}

export default function MyApp() {
  return (
    <div id="hello">
      <h1>Welcome to my app</h1>
      <Hello />
    </div>
  );
}
