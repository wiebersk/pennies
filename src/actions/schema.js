import { schema, } from "normalizr";

export const transactionSchema = new schema.Entity("transactions", {}, { idAttribute: "_id", });

export const budgetCategorySchema = new schema.Entity("budgetCategories", {
  transactions: [transactionSchema,],
}, { idAttribute: "_id", });

export const budgetSchema = new schema.Entity("budgets", {
  budgetCategories: [budgetCategorySchema,],
}, { idAttribute: "_id", });

export const budgetsSchema = [budgetSchema,];
export const budgetCategoriesSchema = [budgetCategorySchema,];
export const transactionsSchema = [transactionSchema,];
