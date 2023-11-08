import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class Child extends React.Component {
  handleClick = () => {
    this.props.onMsg('Hello');
  };

  render() {
    return (
      <Fragment>
        <div>{this.props.content}</div>
        <button onClick={this.handleClick}>传值</button>
      </Fragment>
    );
  }
}

// 限制传入的 props 类型
Child.propTypes = {
  content: PropTypes.string,
};

// 设置 props 默认值
Child.defaultProps = {
  content: 'Hello world!',
};

export default Child;
