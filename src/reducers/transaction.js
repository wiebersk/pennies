import { RETRIEVE_TRANSACTIONS_SUCCESS, } from "../actions/transaction.js";

const transactionReducer = (state = {}, action) => {
  switch (action.type) {
    case RETRIEVE_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, action.transactions);
    default:
      return state;
  }
};

export default transactionReducer;
