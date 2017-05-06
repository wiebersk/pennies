var express = require('express');
var router = express.Router({mergeParams: true});
var Budget     = require('../models/budget.js');

/* GET users listing. */
module.exports = (function() {
// more routes for our API will happen here
  router.route('/transactions')
      .post(function(req, res) {
        Budget.addTransactionToBudget({budgetDate: req.body.transactionDate, categoryName: req.body.budgetCategory, transaction: {name: req.body.name, memo: req.body.memo, transactionDate: req.body.transactionDate, amount: req.body.amount}}, function(err, budget) {
          if (err) {
            res.send(err);
          }
          res.status(201).json(budget);
        });
      });

  router.route('/budgets/:budget_id/budget_categories/:budget_category_id/transactions')

    .get(function(req, res) {

    })
    .put(function(req, res) {
      Budget.findById(req.params.budget_id, function(err, budget) {
        budget.budgetCategory.id(req.params.budget_category_id).transactions.push(req.body);
        budget.save(function(err, budget) {
          if (err)
            res.send(err);
          res.json(budget);
        });
      });
    });
  router.route('/budgets/:budget_id/budget_categories/:budget_category_id/transactions/:transaction_id')
    .post(function(req, res) {
      Budget.findById(req.params.budget_category_id, function(err, budget) {
        if (err)
          res.send(err);
        if (budget) {
          trans = budget.budgetCategories.id(req.params.budget_id).transactions.id(req.params.transaction_id);
          trans = _.merge(trans, req.body);
          budget.save(function(err) {
            if (err)
              res.send(err);
            res.json(trans);
          });
        } else {
          res.json([]);
        }
      });
    })

    .delete(function(req, res) {
      Budget.findById(req.params.budget_id, function(err, budget) {
        if (err)
          res.send(err);
        if(budget) {
          budget.budgetCategory.id(req.params.budget_category_id).transactions.id(req.params.transaction_id).remove();
          budget.save(function(err) {
            if(err)
              res.send(err);
            res.json([]);
          })
        } else {
          res.json([]);
        }
      });
    });


  return router;
})();
