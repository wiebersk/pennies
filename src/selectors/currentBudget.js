import { createSelector } from "reselect"
import _ from "lodash"

const currentBudget = (state) => state.preferences.current_budget || ""
const getBudgets = (state) => state.budgets
const getBudgetCats = (state) => state.budget_categories
const getTransactions = (state) => state.transaction

export const getCurrentBudget = createSelector(
  [ currentBudget, getBudgets ],
  ( currentBudget, budgets ) => {
    if(currentBudget == undefined || currentBudget == "") {
      return []
    } else {
      return budgets[currentBudget]
    }
  }
)

export const getCurrentBudgetCats = createSelector(
  [ currentBudget, getBudgets, getBudgetCats ],
  (currentBudget, budgets, budgetCats) => {
    if(currentBudget == undefined || currentBudget == "") {
      return []
    } else {
      const budgetCatIds = budgets[currentBudget].budgetCategories
      const cats = _.filter(budgetCats, (o) => {
      	return _.includes(budgetCatIds, o._id);
      });
      return cats;
    }
  }
)

export const getCurrentTransactions = createSelector(
  [ getCurrentBudgetCats, getTransactions ],
  ( currentBudgetCats, transactions ) => {
    if (currentBudgetCats == []) {
      return []
    } else {
      const transIds = _.flatten(_.map(currentBudgetCats, (category) => {
      	return category.transactions
      }));

      const matchedTrans = _.filter(transactions, (trans) => {
      	return _.includes(transIds, trans._id);
      });
      return matchedTrans;
    }
  }
)
