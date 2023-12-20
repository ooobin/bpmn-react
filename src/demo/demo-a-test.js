import React from "react";

class Test extends React.Component {
    componentDidMount() {
        const arr = [1, 2, 3];
        const newArr = arr.map(item => {
             console.log(item);
            return item + 1;
        })
        console.log(newArr)
    }

    render() {}
}

export default Test;
