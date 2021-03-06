const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const { server } = require('../linesolution.js')

// Set the current state
// server.post('/setup', (req, res) => {
//   switch (req.body.state) {
//     case 'date count == 0':
//       dataStore.count = 0
//       break
//     default:
//       dataStore.count = 1000
//   }

//   res.end()
// })

server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Our Little Consumer', () => {
    let opts = {
      provider: 'Line Solution Provider',
      providerBaseUrl: 'http://localhost:8081',
      //providerStatesSetupUrl: 'http://localhost:8081/setup',
      pactBrokerUrl: 'http://localhost/',
      //tags: ['prod'],
      pactBrokerUsername: 'postgres',
      pactBrokerPassword: 'password',
      publishVerificationResult: true,
      providerVersion: '1.0.0',
    }

    return new Verifier().verifyProvider(opts).then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
    })
  })
})
