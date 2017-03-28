import { Button, } from "antd";
import BudgetForm from "containers/BudgetForm";
import React from "react";
import { CREATE_BUDGET_REQUESTED, } from "actions/budget.js";
import { connect, } from "react-redux";


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
      const budgetCategories = values.budget_categories.map((val) => {
                              	var rObj = {};
                              	rObj.amount = values["amounts" + val];
                              	rObj.name = values["budget_categories" + val];
                              	return rObj;
                              });
      this.props.dispatch({ type: CREATE_BUDGET_REQUESTED, budget: {
        name: values.name,
        description: values.description,
        budgetDate: values.budget_start_date.toDate(),
        budgetEndDate: values.budget_end_date.toDate(),
        budgetCategories: budgetCategories,
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
        <Button type="primary" onClick={this.showModal}>Create New Budget</Button>
          <BudgetForm visible={this.state.visible} onCreate={this.handleOk} onCancel={this.handleCancel} ref={this.saveFormRef} />
      </div>
    );
  },
});

export default BudgetModal;
