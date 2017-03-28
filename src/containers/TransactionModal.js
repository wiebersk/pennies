import { Button, } from "antd";
import TransactionForm from "components/TransactionForm";
import React from "react";
import { CREATE_TRANSACTION_REQUESTED, } from "actions/transaction.js";
import { connect, } from "react-redux";
import { getUniqueBudgetCats, } from "selectors/currentBudget";

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
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        console.log(values);
        return;
      }

      console.log("Received values of form: ", values);
      this.props.dispatch({ type: CREATE_TRANSACTION_REQUESTED, payload: {
        transactionDate: values.transaction_date.format(),
        budgetCategory: values.budget_category,
        name: values.description,
        memo: "",
        amount: values.transaction_amount,

      }, });
      form.resetFields();
      this.setState({ visible: false, });
    });
  },
  handleCancel (ev) {
    console.log("Cancel");
    this.setState({
      visible: false,
    });
  },
  saveFormRef (form) {
    this.form = form;
  },
  render () {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create Transaction</Button>
          <TransactionForm budgetCats={this.props.budgetCats} visible={this.state.visible} onCreate={this.handleOk} onCancel={this.handleCancel} ref={this.saveFormRef} />
      </div>
    );
  },
});

const mapStateToProps = (state) => {
  return {
    budgetCats: getUniqueBudgetCats(state),
  };
};

export default connect(
  mapStateToProps,
  undefined
)(TransactionModal);
