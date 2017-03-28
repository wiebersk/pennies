import budgetSaga from "sagas/budgets.js";
import transactionSaga from "sagas/transactions.js";
import { fork, } from "redux-saga/effects";

export default function* rootSaga () {
    yield [
        fork(budgetSaga),
        fork(transactionSaga),
    ];
}
