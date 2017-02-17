import { routerReducer as routing } from "react-router-redux"
import budgetReducer from "./budget.js"
import budgetCatReducer from "./budget_categories.js"
import transactionReducer from "./transaction.js"
import preferencesReducer from "./preferences.js"
import { combineReducers } from "redux"

export default combineReducers({
  budgets: budgetReducer,
  budget_categories: budgetCatReducer,
  transaction: transactionReducer,
  preferences: preferencesReducer,
  routing
})
