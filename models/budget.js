var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var moment       = require('moment');
var _            = require('lodash');

var TransactionSchema = new Schema({
  //fileUrl: String
  name: {type: String, required: true},
  memo: String,
  transactionDate: {type: Date, required: true },
  amount: {type: Number, required: true, min: 0.00}
});

var BudgetCategorySchema = new Schema({
  name: {type: String, required: true },
  description: String,
  expense: {type: Boolean, required: true, default: true },
  amount: {type: Number, required: true, min: 0.00 },
  transactionSummary: {type: Number, default: 0.00},
  transactions: [TransactionSchema]
});

BudgetCategorySchema.pre('save', function(next) {
  this.transactionSummary = this.transactions.map(function(trans) {
    return trans.amount
  }).reduce(function(previousValue, currentValue) {
    return previousValue + currentValue
  },0);
  next();
});

var BudgetSchema   = new Schema({
    name: {type: String, required: true },
    budgetDate: {type: Date, required: true},
    budgetEndDate: {type: Date },
    description: String,
    cashFlow: {type: Number, default: 0.00},
    budgetCategories: [BudgetCategorySchema]
});

var BudgetCategory = mongoose.model('BudgetCategory', BudgetCategorySchema);
var Transaction = mongoose.model('Transaction', TransactionSchema);

function expense(budgetCategory) {
  if(budgetCategory.expense) {
    return budgetCategory
  }
}

function income(budgetCategory) {
  if(!budgetCategory.expense) {
    return budgetCategory
  }
}

BudgetSchema.statics.findByDate = function(date, cb) {
  this.findOne({ "budgetDate": {'$lte': date}, "budgetEndDate": {'$gt': date}}, function(err, doc) {
    cb(err, doc);
  });
};

BudgetSchema.statics.uniqueBudgetCategories = function(cb) {
  this.find({}, function(err, budgets) {
    var list = _.uniq(_.flatten(_.map(budgets, function(o) { return _.map(o.budgetCategories, function(bc) { return {name: bc.name, expense: bc.expense}}) })), 'name');

    cb(err, list);
  });
};

BudgetSchema.statics.allTransactions = function(cb) {
  this.find({}, function(err, budgets) {
    transactions = _.flattenDeep(_.map(budgets, function(budget) {return _.map(budget.budgetCategories, function(cat) {return cat.transactions})}));

    cb(err, transactions);
  });
};

BudgetSchema.statics.addTransactionToBudget = function(attr, cb) {
  var _this = this;
  _this.findByDate(attr.budgetDate, function(error, budget) {
    // TODO add in logic to handle no budget found
    if (error) {
      cb(error);
    }
    bc = _.find(budget.budgetCategories, {name: attr.categoryName});
    if(bc == undefined) {
      _this.uniqueBudgetCategories(function(err, bcs) {
        if (err)
          cb(err);
        matchBcs = _.find(bcs, {name: attr.categoryName});

        if(matchBcs == undefined) {
          budget.budgetCategories.push({name: attr.categoryName, expense: true, amount: 0, transactions: [attr.transaction]});
          budget.save(cb);
        } else if (Array.isArray(matchBcs)) {
          var bc = new BudgetCategory ({name: matchBcs[0].name, expense: matchBcs[0].expense, amount: 0});
          var trans = new Transaction(attr.transaction);
          bc.transactions.push(trans);
          budget.budgetCategories.push(bc);
          budget.save(cb);
        } else if (typeof matchBcs == 'object') {
          var bc = new BudgetCategory ({name: matchBcs.name, expense: matchBcs.expense, amount: 0});
          var trans = new Transaction(attr.transaction);
          bc.transactions.push(trans);
          budget.budgetCategories.push(bc);
          budget.save(cb);
        } else {
          console.log('Well Farts');
        }
      });
    } else if (Array.isArray(bc)) {
      bc[0].transactions.push(new Transaction(attr.transaction));
      budget.save(cb);
    } else if (typeof bc == 'object') {
      bc.transactions.push(new Transaction(attr.transaction));
      budget.save(cb);
    } else {
      console.log('Well farts, this sux');
    }
  });
}

BudgetSchema.pre('save', function(next) {
  var self = this;
  this.budgetDate = moment(self.budgetDate).startOf('month').toDate();
  this.budgetEndDate = moment(self.budgetDate).endOf('month').toDate();
  expenseAmount = this.budgetCategories.filter(expense).map(function(budgetCategory) {
    return budgetCategory.transactionSummary
  }).reduce(function(prev, curr) {
    return prev + curr;
  },0);

  incomeAmount = this.budgetCategories.filter(income).map(function(budgetCategory) {
    return budgetCategory.transactionSummary
  }).reduce(function(prev, curr) {
    return prev + curr;
  },0);

  this.cashFlow = (incomeAmount - expenseAmount).toFixed(2);

  next();
});

module.exports = mongoose.model('Budget', BudgetSchema);
