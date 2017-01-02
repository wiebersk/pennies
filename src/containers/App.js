import React from 'react';
import { Button } from 'antd';
import api from '../utils/Api.js'
import {RETRIEVE_BUDGETS_REQUESTED, CREATE_BUDGET_REQUESTED} from '../actions/budget.js'
import {connect} from 'react-redux';

const App = ({onBudgetClick, onBudgetCreateClick}) => {
    return (
      <div>
        <h1>Test App</h1>
        <Button onClick={onBudgetClick}>Budgets</Button>
        <Button onClick={onBudgetCreateClick}>Create Budget</Button>
      </div>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onBudgetClick: () => {
      dispatch({type: RETRIEVE_BUDGETS_REQUESTED})
    },
    onBudgetCreateClick: () => {
      dispatch({type: CREATE_BUDGET_REQUESTED, budget: {name: 'Test React Budget', budgetDate: new Date()}})
    }
  }
}


export default connect(
  undefined,
  mapDispatchToProps
)(App);
