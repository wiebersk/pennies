import { call, put, } from "redux-saga/effects";
import { takeEvery, } from "redux-saga";
import { normalize, } from "normalizr";
import { budgetSchema, } from "actions/schema.js";

import { CREATE_TRANSACTION_REQUESTED, CREATE_TRANSACTION_SUCCESS, CREATE_TRANSACTION_FAIL, } from "actions/transaction.js";
import { RETRIEVE_BUDGET_CATS_SUCCESS, } from "actions/budget_category.js";
import { RETRIEVE_BUDGETS_SUCCESS, } from "actions/budget.js";
import api from "utils/Api.js";

function* createTransaction (action) {
  try {
    const transactionRes = yield call(api.createTransaction, action.payload);
    const normalRes = normalize(transactionRes.data, budgetSchema).entities;
    console.log("Normal Res", normalRes);
    yield put({ type: CREATE_TRANSACTION_SUCCESS, transaction: normalRes.transactions, });
    yield put({ type: RETRIEVE_BUDGETS_SUCCESS, budgets: normalRes.budgets, });
    yield put({ type: RETRIEVE_BUDGET_CATS_SUCCESS, budget_categories: normalRes.budgetCategories, });
  } catch (ev) {
    yield put({ type: CREATE_TRANSACTION_FAIL, message: ev.message, });
  }
}

function* transactionSaga () {
  yield [
    takeEvery(CREATE_TRANSACTION_REQUESTED, createTransaction),
  ];
}

export default transactionSaga;
