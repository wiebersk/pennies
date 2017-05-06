const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/../public/index.html')

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(express.static('public'))
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    app.use('/api/budgets', require('../routes/budget.js'))
    app.use('/api/', require('../routes/budget_categories.js'));
    app.use('/api/', require('../routes/transactions.js'));


    return app
  }
}