import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;
import _ from 'lodash';
import {connect} from 'react-redux';

const budgetOptGroup = budgets => {
  if (_.isEmpty(budgets)) {
      return undefined
  } else {
    const options = []
    _.mapKeys(budgets, (budget, id) => {
      options.push(<Option value={id} key={id}>{budget.name}</Option>);
    });
    return options
  }
}

const BudgetPicker = (props) => {
  return (
    <Select style={{ width: 120 }}>
      {budgetOptGroup(props.budgets)}
    </Select>
  )
}


const mapStateToProps = (state) => {
  return {
    budgets: state.budgets
  }
}

export default connect(
  mapStateToProps,
  undefined
)(BudgetPicker);
