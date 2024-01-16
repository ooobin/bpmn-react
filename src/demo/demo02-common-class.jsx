import React from 'react';
import { connect } from "react-redux";

class CommonClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yourStateProperty: props.yourStateProperty,
        };
    }

    render() {
        return (
            <div>
                <h1>CommonClass</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

export default connect(mapStateToProps)(CommonClass);
