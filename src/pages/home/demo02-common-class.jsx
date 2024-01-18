import React from 'react';
import { connect } from "react-redux";
import { updateYourStateProperty } from "../../store/actions";

class CommonClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <h1>{this.props.yourStateProperty}</h1>
                <h1>CommonClass</h1>
            </div>
        );
    }
}

/**
 * 获取 redux 全局状态
 */
const mapStateToProps = state => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

/**
 * 修改 redux 全局状态
 */
const mapDispatchToProps = {
    updateYourStateProperty
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonClass);
