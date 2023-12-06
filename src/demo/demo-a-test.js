import React from "react";
import moment from "moment";

class Test extends React.Component {
    componentDidMount() {
        const timeString = "2023-02-27 00:00:00"
        const timeStamp = new Date(timeString).getTime();
        console.log(timeStamp)
        const days = Math.ceil(timeStamp / (1000 * 60 * 60 * 24));
        const date = moment(new Date(days * 24 * 60 * 60 * 1000)).format("YYYY-MM-DD");
        console.log(date);
    }

    render() {
        return (
          <button onClick={this.handleClick}>click</button>
        )
    }
}

export default Test;
