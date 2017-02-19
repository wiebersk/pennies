import { Modal, Button, } from "antd";
import TransactionForm from "./TransactionForm";
import React from "react";

const TransactionModal = React.createClass({
  getInitialState () {
    return { visible: false, };
  },
  showModal () {
    this.setState({
      visible: true,
    });
  },
  handleOk () {
    console.log("Clicked OK");
    this.setState({
      visible: false,
    });
  },
  handleCancel (ev) {
    console.log(ev);
    this.setState({
      visible: false,
    });
  },
  render () {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create Transaction</Button>
        <Modal title="New Transaction" visible={this.state.visible}>
          <TransactionForm />
        </Modal>
      </div>
    );
  },
});

export default TransactionModal;
