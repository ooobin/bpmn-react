import React from 'react';
import { connect } from "react-redux";
import Breadcrumb from "antd/lib/breadcrumb";

class CommonClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yourStateProperty: this.props.yourStateProperty,
        };
    }

    handleBreadcrumb = () => {
    };

    render() {
        return (
            <div id="test">
                <Breadcrumb>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <a href="">Application Center</a>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <h1>Test</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

export default connect(mapStateToProps)(CommonClass);
