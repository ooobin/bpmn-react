import React from 'react';
import { connect } from "react-redux";
import Breadcrumb from "antd/lib/breadcrumb";

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
                        <a href="./common">common</a>
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
