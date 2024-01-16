import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/router";
import "./index.css";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <Router />
        </ConfigProvider>
    </Provider>,
);
