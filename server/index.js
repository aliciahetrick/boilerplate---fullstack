const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
app.use('/api', require('./routes'))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})

app.use(function (err, req, res, next) {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

module.exports = app
