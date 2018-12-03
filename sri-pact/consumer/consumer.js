const client = require('./lineClient.js')

client.getLineSolutions(new Date().toISOString()).then(
  response => {
    console.log(response)
  },
  error => {
    console.error(error)
  }
)
