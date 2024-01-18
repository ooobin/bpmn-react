import React from 'react';

class CommonClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="test">
                <h1>Test</h1>
            </div>
        );
    }
}

export default CommonClass;
