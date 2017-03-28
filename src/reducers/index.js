import { routerReducer as routing, } from "react-router-redux";
import budgetReducer from "reducers/budget.js";
import budgetCatReducer from "reducers/budget_categories.js";
import transactionReducer from "reducers/transaction.js";
import preferencesReducer from "reducers/preferences.js";
import { combineReducers, } from "redux";

export default combineReducers({
  budgets: budgetReducer,
  budget_categories: budgetCatReducer,
  transaction: transactionReducer,
  preferences: preferencesReducer,
  routing,
});
