var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Budget     = require('../models/budget.js');

/* GET users listing. */
module.exports = (function() {
// more routes for our API will happen here
  router.route('/budget_categories')
      .get(function(req, res) {
        Budget.uniqueBudgetCategories(function(err, budgetCats) {
          if (err)
            res.send(err);
          res.json(budgetCats);
        });
      });

  router.route('/budgets/:budget_id/budget_categories/')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
      Budget.findById(req.params.budget_id, function(err, budget) {
          if (err)
              res.send(err);
          if (budget) {
            res.json(budget.budgetCategories);
          } else {
            res.json([]);
          }
      });
    })
    .put(function(req, res) {
      Budget.findById(req.params.budget_id, function(err, budget) {
        if (err)
          res.send(err);
        if (budget) {
          budget.budgetCategories.push(req.body);
          budget.save(function(err) {
            if (err)
              res.send(err);
            res.json(req.body)
          })
        } else {
          res.json([]);
        }
      });
    });

  router.route('/budgets/:budget_id/budget_categories/:budget_category_id')
    .post(function(req, res) {
      Budget.findOne({'budgetCategories.id': req.params.budget_category_id}, function(err, budget) {
        if (err)
          res.send(err);
        if (budget) {
          bcrec = budget.budgetCategories.id(req.params.budget_id);
          bcrec = _.merge(bcrec, req.body);
          bcrec.save(function(err) {
            if (err)
              res.send(err);
            res.json(bcrec);
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
          budget.budgetCategory.id(req.params.budget_category_id).remove();
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
