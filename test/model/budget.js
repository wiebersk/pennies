var mongoose = require('mongoose');
var config = require('config');
var ObjectId = require('mongoose').Types.ObjectId;
var Budget = require('../../models/budget.js');
var expect = require('expect.js');
var moment = require('moment');
var _ = require('lodash');

describe('Budget', function() {
  before(function(done) {
    mongoose.connect(config.get('db.url'),function() {
      done();
    });
  });

  after(function(done) {
    Budget.remove({}, function(err) {
     mongoose.models = {};
     mongoose.modelSchemas = {};
     mongoose.connection.close();
     done();
    });
  });

  describe('#save', function() {
    it('should error without a name', function(done) {
      budget = new Budget({budgetDate: new Date()});
      budget.save(function(err) {
        expect(err.errors.name.name).to.eql('ValidatorError');
        done();
      });
    });

    it('should error without a date', function(done) {
      budget = new Budget({name: 'Test'});
      budget.save(function(err) {
        expect(err.errors.budgetDate.name).to.eql('ValidatorError');
        done();
      });
    });

    it('should not error with a name+date', function(done) {
      budget = new Budget({name: 'Test', budgetDate: new Date()});
      budget.save(function(err) {
        expect(err).to.be(null);
        done();
      });
    });

    describe('budget categories', function() {
      it('should error without a name', function(done) {
          budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[{expense: true, amount: 20.00}]});
          budget.save(function(err) {
            expect(err.errors).not.to.be(null);
            done();
          });
      });

      it('should error without an expense indicator', function(done) {
        budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[{name: 'Category', amount: 20.00}]});
        budget.save(function(err) {
          expect(err.errors).not.to.be(null);
          done();
        });
      });

      it('should error without an amount', function(done) {
        budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[{name: 'Category', expense: true}]});
        budget.save(function(err) {
          expect(err.errors).not.to.be(null);
          done();
        });
      });

      it('should error with a negative amount', function(done) {
        budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[{name: 'Category', expense: true, amount: -22.50}]});
        budget.save(function(err) {
          expect(err.errors).not.to.be(null);
          done();
        });
      });

      it('should accept multiple budget categories', function(done) {
        budget = new Budget({name: 'Test positive', budgetDate: new Date(), budgetCategories:[{name: 'Category', expense: true, amount: 22.50}, {name: 'Category 2', expense: false, amount: 44.20}]});
        budget.save(function(err) {
          expect(err).to.be(null);
          done();
        })
      });

      describe('transactions', function() {
        it('should error without a name', function(done) {
            budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[
              {name: 'Test Category', expense: true, amount: 20.00, transactions: [
                {amount: 18.22, memo: 'test memo', transactionDate: new Date()}
              ] }
            ]});
            budget.save(function(err) {
              expect(err.errors).not.to.be(null);
              done();
            });
        });

        it('should error without an amount', function(done) {
          budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[
            {name: 'Test Category', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', memo: 'test memo', transactionDate: new Date()}
            ] }
          ]});
          budget.save(function(err) {
            expect(err.errors).not.to.be(null);
            done();
          });
        });

        it('should error with a negative amount', function(done) {
          budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[
            {name: 'Test Category', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: -150.22, transactionDate: new Date()}
            ] }
          ]});
          budget.save(function(err) {
            expect(err.errors).not.to.be(null);
            done();
          });
        });

        it('should not error for multiple valid transactions', function(done) {
          budget = new Budget({name: 'Test', budgetDate: new Date(), budgetCategories:[
            {name: 'Test Category', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: 150.22, transactionDate: new Date()},
              {name: 'Test Trans 2', amount: 28.22, transactionDate: new Date()}
            ] }
          ]});
          budget.save(function(err) {
            expect(err).to.be(null);
            done();
          });
        });
      });
    });

    describe('hooks', function() {
      describe('date', function() {
        it('should set the date to the first of the month', function(done) {
          dt = new Date();
          budget = new Budget({name: 'Test date2', budgetDate: dt});
          budget.save();
          Budget.findOne({'name':'Test date2'}, function(err, budget) {
            expect(budget.budgetDate).to.eql(moment(dt).startOf('month').toDate());
            done();
          });
        });

        it('should set the end date to the last of the month', function(done) {
          dt = new Date();
          budget = new Budget({name: 'Test end date', budgetDate: dt});
          budget.save();
          Budget.findOne({'name':'Test end date'}, function(err, budget) {
            expect(budget.budgetEndDate).to.eql(moment(dt).endOf('month').toDate());
            done();
          });
        });
      });

      describe('transactionSummary', function() {
        it('should set the transaction summary', function(done) {
          dt = new Date();
          budget = new Budget({name: 'Test date3', budgetDate: dt, budgetCategories:[
            {name: 'Test Category', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: 150.22, transactionDate: new Date()},
              {name: 'Test Trans 2', amount: 28.22, transactionDate: new Date()}
            ] }
          ]});
          budget.save(function(err) {
            if (err)
              console.log(err);
            Budget.findById(budget._id, function(err, updateBudget){
              expect(updateBudget.budgetCategories[0].transactionSummary).to.eql(178.44);
              done();
            });
          });
        });

        it('should set the cash flow', function(done) {
          dt = new Date();
          budget = new Budget({name: 'Test date4', budgetDate: dt, budgetCategories:[
            {name: 'Test Expense', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: 150.22, transactionDate: new Date()},
              {name: 'Test Trans 2', amount: 28.22, transactionDate: new Date()}
            ] },
            {name: 'Test Expense2', expense: true, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: 21.14, transactionDate: new Date()},
              {name: 'Test Trans 2', amount: 28.10, transactionDate: new Date()}
            ] },
            {name: 'Test Income', expense: false, amount: 20.00, transactions: [
              {name: 'Test transaction', amount: 1500.22, transactionDate: new Date()},
              {name: 'Test Trans 2', amount: 850.12, transactionDate: new Date()}
            ] }
          ]});
          budget.save(function(err) {
            if (err)
              console.log(err);
            Budget.findById(budget._id, function(err, updateBudget){
              expect(updateBudget.cashFlow).to.eql(2122.66);
              done();
            });
          });
        });
      });
    });

    describe('methods', function() {
      it('should return all the budget categories', function(done) {
        Budget.uniqueBudgetCategories(function(err, budgetCats) {
          expect(err).to.be(null);
          expect(budgetCats).to.eql(_.uniq(budgetCats));
          expect(budgetCats.length).to.be.above(1);
          done();
        });
      });

      it('should return the right budget by Date', function(done) {
        dt = moment([2015, 08, 20]).toDate();

        budget = new Budget({name: 'Date Test', budgetDate: dt});

        budget.save(function(err) {
          Budget.findByDate(dt, function(err, budg) {
            expect(budget.id).to.eql(budg.id);
            done();
          });
        });
      })
    });
  });
})
