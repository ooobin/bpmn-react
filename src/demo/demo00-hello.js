import React from 'react';

function Hello() {
  return <h2>Hello World!</h2>;
}

// export default 用于导出模块的默认值
export default function MyApp() {
  return (
    <div id="hello">
      <h1>Welcome to my app</h1>
      <Hello />
    </div>
  );
}
