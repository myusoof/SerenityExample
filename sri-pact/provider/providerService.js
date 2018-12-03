const { server } = require('./linesolution.js')
const port = process.env.API_PORT || 9123

server.listen(port, () => {
  console.log(`Provider Service listening on http://localhost:${port}`)
})
