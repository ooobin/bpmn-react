import { connect } from "react-redux";
import { useState } from "react";

const Common = (props) => {
    const [storeState] = useState(props.yourStateProperty)
    return (
        <div id="common">
            <h1>Common</h1>
            <p>storeState: {storeState}</p>
        </div>
    );
};

const mapStateToProps = (state) => ({
    yourStateProperty: state.yourStateProperty,
    // 您可以在这里添加更多需要的状态属性
});

export default connect(mapStateToProps)(Common);
