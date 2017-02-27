import budgetSaga from "./budgets.js";
import transactionSaga from "./transactions.js";
import { fork, } from "redux-saga/effects";

export default function* rootSaga () {
    yield [
        fork(budgetSaga),
        fork(transactionSaga),
    ];
}
