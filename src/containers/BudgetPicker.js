import React from "react";
import { Select } from "antd";
const Option = Select.Option;
import _ from "lodash";
import {connect} from "react-redux";
import { UPDATE_CURRENT_BUDGET } from "../actions/preferences"

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
    <Select style={{ width: 200 }} dropdownMatchSelectWidth={false} onChange={props.onPickerChange} defaultValue={props.currentBudget}>
      {budgetOptGroup(props.budgets)}
    </Select>
  )
}


const mapStateToProps = (state) => {
  return {
    budgets: state.budgets,
    currentBudget: state.preferences.current_budget || ""
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPickerChange: (value, label) => {
      dispatch({type: UPDATE_CURRENT_BUDGET, id: value})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BudgetPicker);
