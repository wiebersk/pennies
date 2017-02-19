import axios from "axios";

const api = axios.create({
                baseURL: "http://local.host:8080",
                timeout: 1000,
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

export default api;
