const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, '/../public/index.html')

    app.use(express.static('public'))
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}