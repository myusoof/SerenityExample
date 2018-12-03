const request = require('superagent')
const API_HOST = process.env.API_HOST || 'http://localhost'
const API_PORT = process.env.API_PORT || 9123
const moment = require('moment')
const fs = require('fs')
const path = require('path')
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

// Fetch provider data
const getLineSolutions = submissionDate => {

  return request
    .get(`${API_ENDPOINT}/line_solutions/456789/lines`)
    .then(
      res => {
        return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'linesolutions.json')).toString())
          // return {
          //   count: 100 / res.body.count,
          //   date: moment(res.body.validDate, moment.ISO_8601).format(
          //     'YYYY-MM-DDTHH:mm:ssZ'
          //   ),
          // }
      },
      err => {
        throw new Error(`Error from response: ${err.body}`)
      }
    )
}

module.exports = {
  getLineSolutions,
}
