import budgetSaga from './budgets.js'
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield [
        fork(budgetSaga)
    ];
}
