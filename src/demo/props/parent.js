import React from "react";
import Child from "./child";

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: 'Hello world!'
        }
    }

    render() {
        return (
            <Child
                content={this.state.message}
                onMsg={(msg) => {
                    this.setState({
                        message: msg
                    })
                }}
            />
        );
    }
}

export default Parent;