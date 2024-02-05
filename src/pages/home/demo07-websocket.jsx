import React, { useEffect, useState } from 'react';

const WebSocketExample = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // 创建 WebSocket 连接
        const ws = new WebSocket('ws://124.222.224.186:8800');

        // 监听 WebSocket 连接打开事件
        ws.addEventListener('open', () => {
            console.log('WebSocket连接已打开');
            setSocket(ws); // 将WebSocket对象存储在state中，以便后续使用
        });

        // 监听 WebSocket 接收消息事件
        ws.addEventListener('message', (event) => {
            console.log('接收到消息:', event.data);
        });

        // 监听 WebSocket 关闭事件
        ws.addEventListener('close', () => {
            console.log('WebSocket连接已关闭');
        });

        // 在组件卸载时关闭 WebSocket 连接
        return () => {
            ws.close();
        };
    }, []); // 只在组件挂载时执行一次

    /**
     * 发送消息到 WebSocket 服务器
     */
    const sendMessage = () => {
        // 注意: 发送的数据应该是字符串, 如果要发送对象，需要先将其转为字符串
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send('Hello, WebSocket!');
        } else {
            console.error('WebSocket连接尚未建立');
        }
    };

    return (
        <div>
            <h1>WebSocket Example</h1>
            <button onClick={sendMessage}>发送消息</button>
        </div>
    );
};

export default WebSocketExample;
