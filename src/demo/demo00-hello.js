import React from "react";

// hello 示例
function Hello() {
  return <h2>Hello World!</h2>;
}

export default function MyApp() {
  return (
    <div id="hello">
      <h1>welcome to</h1>
      <Hello/>
    </div>
  );
}
