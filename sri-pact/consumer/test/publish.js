const pact = require('@pact-foundation/pact-node')
const path = require('path')
const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: 'http://localhost',
  pactBrokerUsername: 'postgres',
  pactBrokerPassword: 'password',
  tags: ['prod', 'test'],
  consumerVersion:
    '1.0.' +
    (process.env.USER ? process.env.USER : Math.floor(new Date() / 1000)),
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!')
    console.log('')
    console.log('Head over to http://localhost/ and login with')
    console.log('=> Username: postgres')
    console.log('=> Password: password')
    console.log('to see your published contracts.')
  })
  .catch(e => {
    console.log('Pact contract publishing failed: ', e)
  })
