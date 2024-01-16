import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.timer = null; // 定时器
        this.state = {
            expiration: 60 * 60 * 1000, // 超时时间
        };
    }

    componentDidMount() {
        this.activityEventListener();
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
     * 用户活动事件监听器
     */
    activityEventListener() {
        const currentPageUrl = window.location.href;
        if (!currentPageUrl.endsWith("/test")) {
            // 设置定时器
            this.timer = setTimeout(() => {
                // 这个定时器在60分钟后会触发，触发后会将页面的URL重定向到"/test"
                window.location.href = "/test";
            }, this.state.expiration);

            // 监听用户活动，如鼠标移动和键盘按键
            window.addEventListener("mousemove", this.resetTimer);
            window.addEventListener("keydown", this.resetTimer);
        }
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
        }, this.state.expiration);
    };

    render() {
        return (
            <div>
                <h1>定时器</h1>
            </div>
        );
    }
}

export default Timer;
