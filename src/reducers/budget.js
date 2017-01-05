import { RETRIEVE_BUDGETS_SUCCESS, CREATE_BUDGET_SUCCESS } from '../actions/budget.js'

const budgetReducer = (state = {}, action) => {
  switch(action.type) {
    case RETRIEVE_BUDGETS_SUCCESS:
      return Object.assign({}, state, action.budgets);
    case CREATE_BUDGET_SUCCESS:
      return Object.assign({}, state, action.budget.entities.budgets)
    default:
      return state
  }
}

export default budgetReducer;
