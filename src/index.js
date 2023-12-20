import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SelectDemo from "./demo/demo02-select";
import TableDemo from "./demo/demo03-table";
import Antd from "./demo/demo04-antd";
import Echarts from "./demo/demo08-echarts";
import Parent from "./demo/props/parent";
import Home from "./demo/demo09-home";
import Test from "./demo/demo-a-test";
import Bpmn from "./demo/bpmn/bpmn";

import MyApp from "./demo/function/demo01-app";
import MyGame from "./demo/function/demo02-game";
import MyProduct from "./demo/function/demo03-product";

class App extends React.Component {
    timer = null; // 定时器

    componentDidMount() {
        this.activityEventListener();
    }

    /**
     * 用户活动事件监听器
     */
    activityEventListener() {
        const currentPageUrl = window.location.href;
        if (!currentPageUrl.endsWith("/test")) {
            // 设置定时器
            this.timer = setTimeout(() => {
                window.location.href = "/test";
            }, 60 * 60 * 1000); // 60分钟

            // 监听用户活动，如鼠标移动和键盘按键
            window.addEventListener("mousemove", this.resetTimer);
            window.addEventListener("keydown", this.resetTimer);
        }
    }

    componentWillUnmount() {
        // 清除定时器
        if (this.timer) {
            clearTimeout(this.timer);
        }

        // 移除事件监听器
        window.removeEventListener("mousemove", this.resetTimer);
        window.removeEventListener("keydown", this.resetTimer);
    }

    /**
     * 重置定时器
     */
    resetTimer = () => {
        // 用户有活动，取消原定时器
        if (this.timer) {
            clearTimeout(this.timer);
        }

        // 重新设置定时器
        this.timer = setTimeout(() => {
            window.location.href = "/test";
        }, 60 * 60 * 1000); // 60分钟
    };

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/select" exact element={<SelectDemo />} />
                        <Route path="/table" exact element={<TableDemo />} />
                        <Route path="/antd" exact element={<Antd />} />
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
