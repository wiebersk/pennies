import { call, put, } from "redux-saga/effects";
import { takeEvery, } from "redux-saga";
import { normalize, } from "normalizr";
import { budgetsSchema, budgetSchema, transactionsSchema, budgetCategoriesSchema, } from "../actions/schema.js";
import { RETRIEVE_BUDGETS_REQUESTED, RETRIEVE_BUDGETS_SUCCESS, RETRIEVE_BUDGETS_FAIL, CREATE_BUDGET_REQUESTED, CREATE_BUDGET_SUCCESS, CREATE_BUDGET_FAIL, FETCH_BUDGET, } from "../actions/budget.js";
import { RETRIEVE_TRANSACTIONS_SUCCESS, } from "../actions/transaction.js";
import { RETRIEVE_BUDGET_CATS_SUCCESS, } from "../actions/budget_category.js";
import api from "../utils/Api.js";


function* fetchBudgets (action) {
   try {
      const budgets = yield call(api.getBudgets);
      const normalRes = normalize(budgets.data, budgetsSchema).entities;
      yield put({ type: RETRIEVE_BUDGETS_SUCCESS, budgets: normalRes.budgets, });
      yield put({ type: RETRIEVE_TRANSACTIONS_SUCCESS, transactions: normalRes.transactions, });
      yield put({ type: RETRIEVE_BUDGET_CATS_SUCCESS, budget_categories: normalRes.budgetCategories, });
   } catch (ev) {
      yield put({ type: RETRIEVE_BUDGETS_FAIL, message: ev.message, });
   }
}

function* createBudget (action) {
  try {
    const budgetRes = yield call(api.createBudget, action.budget);
    const normalRes = normalize(budgetRes.data.budget, budgetSchema);
    yield put({ type: CREATE_BUDGET_SUCCESS, budget: normalRes, });
  } catch (ev) {
    yield put({ type: CREATE_BUDGET_FAIL, message: ev.message, });
  }
}

function* budgetSaga () {
  yield [
    takeEvery(RETRIEVE_BUDGETS_REQUESTED, fetchBudgets),
    takeEvery(CREATE_BUDGET_REQUESTED, createBudget),
  ];
}

export default budgetSaga;
