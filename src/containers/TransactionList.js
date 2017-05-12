import React from "react";
import { connect, } from "react-redux";
import { getRecentTransactions, } from "selectors/currentBudget";
import DollarDisplay from "components/DollarDisplay";

class TransactionList extends React.Component {

  render () {
    return (
      <ul>
        {transactionListItems(this.props.currentTransactions)}
      </ul>
    );
  }
};

const transactionListItems = (transactions) => {
  const transList = transactions.map((transaction) => {
                        return <li key={transaction._id}>{transaction.name} - <DollarDisplay amount={transaction.amount} /></li>;
                      });
  return transList;
};

const mapStateToProps = (state) => {
  return {
    currentTransactions: getRecentTransactions(state),
    currentBudget: state.preferences.current_budget,
  };
};

export default connect(
  mapStateToProps,
  undefined
)(TransactionList);
