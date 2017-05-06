var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Budget     = require('../models/budget.js');

module.exports = (function() {
  // more routes for our API will happen here
  router.route('/')

      .post(function(req, res) {

          var budget = new Budget(req.body);


          budget.save(function(err) {
              if (err) {
                  res.send(err);
              } else {
                console.log(budget);
                res.json({ budget });
              }
          });

      })
      .get(function(req, res) {
          Budget.find(function(err, budgets) {
              if (err)
                  res.send(err);

              res.json(budgets);
          });
      });

  router.route('/:budget_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Budget.findById(req.params.budget_id, function(err, budget) {
            if (err)
                res.send(err);
            res.json(budget);
        });
    })

    .put(function(req, res) {

          Budget.findById(req.params.budget_id, function(err, budget) {

              if (err)
                  res.send(err);

              _.extend(budget, req.body);

              // save the bear
              budget.save(function(err) {
                  if (err)
                      res.send(err);

                  res.json({ message: 'Budget updated!' });
              });

          });
      })
      .delete(function(req, res) {
          Budget.remove({
              _id: req.params.budget_id
          }, function(err, bear) {
              if (err)
                  res.send(err);

              res.json({ message: 'Successfully deleted' });
          });
      });


  return router;
})();
