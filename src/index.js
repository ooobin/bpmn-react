import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Hello from './demo/demo00-hello';
import SelectDemo from './demo/demo02-select';
import TableDemo from './demo/demo03-table';
import ModalDemo from './demo/demo04-modal';
import CSS from './demo/demo06-css';
import Echarts from './demo/demo08-echarts';
import Parent from './demo/props/parent';
import Home from './demo/demo09-home';
import Test from './demo/demo-a-test';

class App extends React.Component {
  render() {
    // 转布尔
    // const value = 1;
    // console.log(!!value);

    // 在 if 等条件语句中，将表达式的结果强制转换成布尔值是多余的
    // if (value) {
    //     console.log('value is true')
    // }

    return (
      <>
        <BrowserRouter>
          <>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/my-app" exact element={<Hello />} />
              <Route path="/select" exact element={<SelectDemo />} />
              <Route path="/table" exact element={<TableDemo />} />
              <Route path="/modal" exact element={<ModalDemo />} />
              <Route path="/css" exact element={<CSS />} />
              <Route path="/echarts" exact element={<Echarts />} />
              <Route path="/props" exact element={<Parent />} />
              <Route path="/test" exact element={<Test />} />
            </Routes>
          </>
        </BrowserRouter>
      </>
    );
  }
}

createRoot(document.getElementById('root')).render(<App />);
