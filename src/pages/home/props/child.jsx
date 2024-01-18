import React from 'react';

class Child extends React.Component {
    handleClick = () => {
        this.props.onMsg('Hello');
    };

    render() {
        return (
            <>
                <div>{this.props.content}</div>
                <button onClick={this.handleClick}>传值</button>
            </>
        );
    }
}

export default Child;
