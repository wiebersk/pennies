import React from 'react';
import { Button } from 'antd';
import api from '../utils/Api.js'
import {RETRIEVE_BUDGETS_REQUESTED, CREATE_BUDGET_REQUESTED} from '../actions/budget.js'
import {connect} from 'react-redux';

class App extends React.Component {

  componentDidMount() {
    this.props.loadBudgets();
  }

  render() {
    return (
      <div>
        <h1>Test App</h1>
        <Button onClick={this.props.loadBudgets}>Budgets</Button>
        <Button onClick={this.props.onBudgetCreateClick}>Create Budget</Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadBudgets: () => {
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
