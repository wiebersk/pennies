import { UPDATE_CURRENT_BUDGET, } from "../actions/preferences.js";

const preferencesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_BUDGET:
      return Object.assign({}, state, { current_budget: action.id, });
    default:
      return state;
  }
};

export default preferencesReducer;
