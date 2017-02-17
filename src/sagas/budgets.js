import { call, put } from "redux-saga/effects"
import { takeEvery } from "redux-saga"
import { normalize } from "normalizr";
import { budgetsSchema, budgetSchema, transactionsSchema, budgetCategoriesSchema } from "../actions/schema.js";
import { RETRIEVE_BUDGETS_REQUESTED, RETRIEVE_BUDGETS_SUCCESS, RETRIEVE_BUDGETS_FAIL, CREATE_BUDGET_REQUESTED, CREATE_BUDGET_SUCCESS, CREATE_BUDGET_FAIL, FETCH_BUDGET } from "../actions/budget.js"
import { RETRIEVE_TRANSACTIONS_SUCCESS} from "../actions/transaction.js"
import { RETRIEVE_BUDGET_CATS_SUCCESS} from "../actions/budget_category.js"
import api from "../utils/Api.js"


function* fetchBudgets (action) {
   try {
      const budgets = yield call(api.getBudgets);
      const normal_res = normalize(budgets.data, budgetsSchema).entities
      yield put({type: RETRIEVE_BUDGETS_SUCCESS, budgets: normal_res.budgets});
      yield put({type: RETRIEVE_TRANSACTIONS_SUCCESS, transactions: normal_res.transactions});
      yield put({type: RETRIEVE_BUDGET_CATS_SUCCESS, budget_categories: normal_res.budgetCategories});
   } catch (e) {
      yield put({type: RETRIEVE_BUDGETS_FAIL, message: e.message});
   }
}

function* createBudget (action) {
  try {
    const budget_res = yield call(api.createBudget, action.budget);
    const normal_res = normalize(budget_res.data.budget, budgetSchema);
    yield put({type: CREATE_BUDGET_SUCCESS, budget: normal_res});
  } catch (e) {
    yield put({type: CREATE_BUDGET_FAIL, message: e.message});
  }
}

function* budgetSaga () {
  yield [
    takeEvery(RETRIEVE_BUDGETS_REQUESTED, fetchBudgets),
    takeEvery(CREATE_BUDGET_REQUESTED, createBudget)
  ];
}

export default budgetSaga;
