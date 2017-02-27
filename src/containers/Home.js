import React from "react";
import { Button, Row, Col, } from "antd";
import BudgetPicker from "../containers/BudgetPicker";
import TransactionList from "./TransactionList";
import BudgetOverview from "./BudgetOverview";
import TransactionModal from "./TransactionModal";
import BudgetModal from "./BudgetModal";
import { RETRIEVE_BUDGETS_REQUESTED, CREATE_BUDGET_REQUESTED, } from "../actions/budget.js";
import { connect, } from "react-redux";

class Home extends React.Component {

  render () {
    return (
      <Row gutter={16}>
        <Col span={16}>
          <TransactionModal />
          <BudgetModal />
          <BudgetPicker />
          <BudgetOverview />
        </Col>
        <Col span={8}>
          <TransactionList />
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBudgets: () => {
      dispatch({ type: RETRIEVE_BUDGETS_REQUESTED, });
    },
    onBudgetCreateClick: () => {
      dispatch({ type: CREATE_BUDGET_REQUESTED, budget: { name: "Test React Budget", budgetDate: new Date(), }, });
    },
  };
};


export default connect(
  undefined,
  mapDispatchToProps
)(Home);
