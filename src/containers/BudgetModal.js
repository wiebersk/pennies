import { Button, } from "antd";
import BudgetStepsForm from "./BudgetStepsForm";
import React from "react";
import { CREATE_BUDGET_REQUESTED, } from "../actions/transaction.js";
import { connect, } from "react-redux";
import { getUniqueBudgetCats, } from "../selectors/currentBudget";


const BudgetModal = React.createClass({
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
        return;
      }

      console.log("Received values of form: ", values);
      this.props.dispatch({ type: CREATE_BUDGET_REQUESTED, payload: {

      }, });
      // form.resetFields();
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
        <Button type="primary" onClick={this.showModal}>Create New Budget</Button>
          <BudgetStepsForm budgetCats={this.props.budgetCats} visible={this.state.visible} onCreate={this.handleOk} onCancel={this.handleCancel} ref={this.saveFormRef} />
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
)(BudgetModal);
