import React from "react";
import { Button, Modal } from "antd";

class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false, // 弹窗是否可见
    };
  }

  render() {
    return (
      <div id="modal">
        <Button
          onClick={() => {
            this.setState({ modalVisible: true });
          }}
        >
          Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={this.state.modalVisible}
          onCancel={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ModalDemo;
