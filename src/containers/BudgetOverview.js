import React from "react";
import { connect, } from "react-redux";
import DollarDisplay from "components/DollarDisplay";
import { getCurrentBudgetCats, } from "selectors/currentBudget";
import { Table, } from "antd";
import _ from "lodash";

class BudgetOverview extends React.Component {

  getDataSource () {
    return _.map(this.props.currentBudgetCats, (budgetCat) => {
    	return { name: budgetCat.name, expense: budgetCat.expense, amount: budgetCat.amount, actual: budgetCat.transactionSummary, };
    });
  }

  getColumns () {
    return [{
      title: "Category",
      dataIndex: "name",
      key: "name",
    }, {
      title: "Planned Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (
        <DollarDisplay amount={text}/>
      )
    }, {
      title: "Actual Amount",
      dataIndex: "actual",
      key: "actual",
      render: (text, record) => (
        <DollarDisplay amount={text}/>
      ),
    },];
  }

  render () {
    return (
      <Table columns={this.getColumns()} dataSource={this.getDataSource()} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    currentBudgetCats: getCurrentBudgetCats(state),
  };
};

export default connect(
  mapStateToProps,
  undefined
)(BudgetOverview);
