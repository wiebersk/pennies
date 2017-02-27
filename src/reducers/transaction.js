import { RETRIEVE_TRANSACTIONS_SUCCESS, CREATE_TRANSACTION_SUCCESS, } from "../actions/transaction.js";

const transactionReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, action.transactions);
    case CREATE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, action.transaction);
    default:
      return state;
  }
};

export default transactionReducer;
