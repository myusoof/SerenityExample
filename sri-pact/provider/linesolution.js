const express = require('express')
const cors = require('cors')
const moment = require('moment')
const bodyParser = require('body-parser')
const fs = require('fs')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

server.get('/line_solutions/:lineguid/lines', (req, res) => {
  res.json(JSON.parse(fs.readFileSync('./linesolutions.json').toString()))
      // res.json({
      //   test: 'NO',
      //   validDate: moment(new Date(), moment.ISO_8601).format(
      //     'YYYY-MM-DDTHH:mm:ssZ'
      //   ),
      //   count: 1000,
      // })
})

module.exports = {
  server,
}
