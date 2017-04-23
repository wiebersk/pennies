import axios from "axios";

const api = axios.create({
                baseURL: process.env.API_URL,
                timeout: 1500,
            });

api.getBudgets = () => {
  return api.get("budgets");
};

api.getBudgetCats = () => {
  return api.get("budget_categories");
};

api.createBudget = (budget) => {
  return api.post("budgets", budget);
};

api.createTransaction = (transaction) => {
  console.log(transaction);
  return api.post("/transactions", transaction);
};

export default api;
