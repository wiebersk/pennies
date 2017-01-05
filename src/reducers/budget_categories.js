import { RETRIEVE_BUDGET_CATS_SUCCESS, CREATE_BUDGET_CAT } from '../actions/budget_category.js'

const budgetCatReducer = (state = {}, action) => {
  switch(action.type) {
    case RETRIEVE_BUDGET_CATS_SUCCESS:
      return Object.assign({}, state, action.budget_categories);
    default:
      return state
  }
}

export default budgetCatReducer;
