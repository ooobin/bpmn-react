import React from "react";
import demo09Home from "./demo09-home";
import http from "../utils/http";

class Test extends React.Component {
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
            <div id="admin-home">

            </div>
        )
    }
}

export default Test;
