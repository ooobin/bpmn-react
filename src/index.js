import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 类组件
import SelectDemo from "./demo/demo02-select";
import TableDemo from "./demo/demo03-table";
import ModalDemo from "./demo/demo04-modal";
import Echarts from "./demo/demo08-echarts";
import Parent from "./demo/props/parent";
import Home from "./demo/demo09-home";
import Test from "./demo/demo-a-test";
import Bpmn from "./demo/bpmn/bpmn";

// 函数组件
import MyApp from "./demo/function/demo01-app";
import MyGame from "./demo/function/demo02-game";
import MyProduct from "./demo/function/demo03-product";

class App extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/select" exact element={<SelectDemo />} />
                        <Route path="/table" exact element={<TableDemo />} />
                        <Route path="/modal" exact element={<ModalDemo />} />
                        <Route path="/echarts" exact element={<Echarts />} />
                        <Route path="/props" exact element={<Parent />} />
                        <Route path="/test" exact element={<Test />} />
                        <Route path="/bpmn" exact element={<Bpmn />} />

                        <Route path="/my-app" exact element={<MyApp />} />
                        <Route path="/my-game" exact element={<MyGame />} />
                        <Route path="/my-product" exact element={<MyProduct />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

createRoot(document.getElementById("root")).render(<App />);
