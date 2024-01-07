import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SelectDemo from "../demo/demo02-select";
import TableDemo from "../demo/demo03-table";
import Antd from "../demo/demo04-antd";
import Echarts from "../demo/demo08-echarts";
import Parent from "../demo/props/parent";
import Home from "../demo/demo09-home";
import Test from "../demo/demo-a-test";
import Bpmn from "../demo/bpmn/bpmn";

import MyApp from "../demo/function/demo01-app";
import MyGame from "../demo/function/demo02-game";
import MyProduct from "../demo/function/demo03-product";
import Result_404 from "../pages/result/result_404";

class Router extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="*" component={Result_404} />
                    </Switch>
                </BrowserRouter>
            </>
        );
    }
}

export default Router;
