import React from "react";

class Test extends React.Component {
    state = {
        count: 0,
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1,
        }, () => {
            console.log(this.state.count);
        });
    }

    render() {
        return (
          <button onClick={this.handleClick}>click</button>
        )
    }
}

export default Test;
