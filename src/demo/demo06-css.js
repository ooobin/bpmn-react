import React from 'react';
import { Button } from 'antd';
import '../demo/css/demo06-animation.scss';
import { CSSTransition } from 'react-transition-group';

class CSS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHide: false,
    };
  }

  render() {
    return (
      <div id="css">
        <CSSTransition in={this.state.isHide} timeout={1000} classNames="hello" unmountOnExit>
          <div>Hello World!</div>
        </CSSTransition>
        <Button
          type="primary"
          onClick={() => {
            this.setState((prevState) => ({
              isHide: !prevState.isHide,
            }));
          }}
        >
          点击
        </Button>
      </div>
    );
  }
}

export default CSS;
