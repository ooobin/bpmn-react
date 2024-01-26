import React from 'react';
import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Route, Switch } from "react-router-dom";
import Menu from "../components/menu/menu";

// 路由组件
import Test from "./home/demo00-test";
import Common from "./home/demo01-common";
import CommonClass from "./home/demo02-common-class";
import TableDemo from "./home/demo03-table";
import Timer from "./home/demo04-timer";
import BreadcrumbDemo from "./home/demo05-breadcrumb";
import Foreach from "./home/demo06-foreach";
import BarEcharts from "./home/demo08-echarts";
import Props from "./home/props/parent";
import Result_404 from "./result/result-404";

class PageStructure extends React.Component {
    constructor(props) {
        super(props);
        this.headerStyle = {
            textAlign: 'center',
            color: '#fff',
            height: '8vh',
            backgroundColor: '#4096ff',
        };
        this.bodyStyle = {
            height: '92vh'
        }
        this.siderStyle = {
            backgroundColor: '#fff',
        };
        this.state = {};
    }

    render() {
        return (
            <div id="home">
                <Layout>
                    <Header style={this.headerStyle}>Header</Header>
                    <Layout style={this.bodyStyle}>
                        <Sider width="25%" style={this.siderStyle}>
                            <Menu />
                        </Sider>
                        <Content>
                            <Switch>
                                <Route path="/home/test" exact component={Test} />
                                <Route path="/home/common" exact component={Common} />
                                <Route path="/home/common-class" exact component={CommonClass} />
                                <Route path="/home/table-demo" exact component={TableDemo} />
                                <Route path="/home/timer" exact component={Timer} />
                                <Route path="/home/breadcrumb-demo" exact component={BreadcrumbDemo} />
                                <Route path="/home/foreach" exact component={Foreach} />
                                <Route path="/home/bar-echarts" exact component={BarEcharts} />
                                <Route path="/home/props" exact component={Props} />
                                <Route path="*" component={Result_404} />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default PageStructure;
