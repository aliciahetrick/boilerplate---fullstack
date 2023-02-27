const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../index.html'))
})
