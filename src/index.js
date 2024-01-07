import React from "react";
import ReactDOM from "react-dom/client";
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import "./index.css";
import Router from "./routes/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ConfigProvider locale={zhCN}>
            <Router />
        </ConfigProvider>
    </React.StrictMode>,
);
