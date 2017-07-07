import { Menu, Icon, } from "antd";
import { CREATE_TRANSACTION_REQUESTED, } from "actions/transaction.js";
import { connect, } from "react-redux";
import { getUniqueBudgetCats, } from "selectors/currentBudget";
import TransactionForm from "components/TransactionForm";
import React from "react";
import { CREATE_BUDGET_REQUESTED, } from "actions/budget.js";
import BudgetForm from "containers/BudgetForm";

const MenuBar = React.createClass({
  getInitialState () {
    return { trans_visible: false, budget_visible: false, };
  },

  showTransModal () {
    this.setState({
      trans_visible: true,
    });
  },
  handleBudgetOk () {
    const form = this.budget_form;
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
      const budget = {
        name: values.name,
        description: values.description,
        budgetDate: values.budget_start_date.toDate(),
        budgetEndDate: values.budget_end_date.toDate(),
        budgetCategories: budgetCategories,
      };
      this.props.onBudgetCreateClick(budget);

      form.resetFields();
      this.setState({ budget_visible: false, });
    });
  },
  handleTransOk () {
    const form = this.trans_form;
    form.validateFields((err, values) => {
      if (err) {
        console.log(values);
        return;
      }

      console.log("Received values of form: ", values);
      this.props.onTransactionCreateClick({
        transactionDate: values.transaction_date.format(),
        budgetCategory: values.budget_category,
        name: values.description,
        memo: "",
        amount: values.transaction_amount,
      });

      form.resetFields();
      this.setState({ trans_visible: false, });
    });
  },

  showBudgetModal () {
    this.setState({
      budget_visible: true,
    });
  },

  handleBudgetCancel (ev) {
    console.log("Cancel");
    this.setState({
      budget_visible: false,
    });
  },
  handleTransCancel (ev) {
    console.log("Cancel");
    this.setState({
      trans_visible: false,
    });
  },
  saveBudgetFormRef (form) {
    this.budget_form = form;
  },
  saveTransFormRef (form) {
    this.trans_form = form;
  },

  render () {
    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item key="transaction" >
            <Icon type="mail" /><a style={{ display: "inline" }} onClick={this.showTransModal}>Create Transaction</a>
          </Menu.Item>
          <Menu.Item key="budget">
            <Icon type="appstore" /><a style={{ display: "inline" }} onClick={this.showBudgetModal}>Create Budget</a>
          </Menu.Item>
        </Menu>
        <BudgetForm visible={this.state.budget_visible} onCreate={this.handleBudgetOk} onCancel={this.handleBudgetCancel} ref={this.saveBudgetFormRef} />
        <TransactionForm budgetCats={this.props.budgetCats} visible={this.state.trans_visible} onCreate={this.handleTransOk} onCancel={this.handleTransCancel} ref={this.saveTransFormRef} />
      </div>
    );
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onBudgetCreateClick: (budgets) => {
      dispatch({ type: CREATE_BUDGET_REQUESTED, budget: budgets, });
    },
    onTransactionCreateClick: (transaction) => {
      dispatch({ type:CREATE_TRANSACTION_REQUESTED, payload: transaction, });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    budgetCats: getUniqueBudgetCats(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
