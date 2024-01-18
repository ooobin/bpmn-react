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
        const workContent = '票号：';
        const ticketNoPattern = /.*I.*/;
        let title = '匹配';
        if (!ticketNoPattern.test(workContent)) {
            title = '不匹配'
        }
        return (
            <div id="test">
                <h1>{title}</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

export default connect(mapStateToProps)(CommonClass);
