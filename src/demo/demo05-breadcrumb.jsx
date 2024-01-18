import React from 'react';
import { connect } from "react-redux";
import Breadcrumb from "antd/lib/breadcrumb";
import { Link } from "react-router-dom";

class BreadcrumbDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yourStateProperty: props.yourStateProperty,
        };
    }

    render() {
        return (
            <div id="breadcrumb">
                <h1>Breadcrumb</h1>
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {/* 使用 Link 组件而不是 <a> 标签，因为跳转不会刷新页面，So Fast */}
                        <Link to="/home/common">common</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>breadcrumb</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

export default connect(mapStateToProps)(BreadcrumbDemo);
