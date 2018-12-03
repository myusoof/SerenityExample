const chai = require('chai')
const path = require('path')
const fs = require('fs')
const chaiAsPromised = require('chai-as-promised')
const Pact = require('@pact-foundation/pact').Pact
const { somethingLike: like, term } = require('@pact-foundation/pact').Matchers
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
const { getLineSolutions } = require('../lineClient.js')
chai.use(chaiAsPromised)

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
  consumer: 'Line Solution Consumer',
  provider: 'Line Solution Provider',
  port: API_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2,
})
const date = '2013-08-16T15:31:20+10:00'
const submissionDate = new Date().toISOString()
const dateRegex =
  '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\+|\\-)\\d{2}:\\d{2}'

describe('Pact with Our Provider', () => {
  before(() => {
    return provider.setup()
  })

  describe('given data count > 0', () => {
    describe('when a call to the Provider is made', () => {
      describe('and a valid date is provided', () => {
        before(() => {
          return provider.addInteraction({
            state: 'date count > 0',
            uponReceiving: 'a request for JSON data',
            withRequest: {
              method: 'GET',
              path: '/line_solutions/456789/lines',
            },
            willRespondWith: {
              status: 200,
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
              body: (fs.readFileSync(path.resolve(__dirname, '../linesolutions.json')).toString()),
            },
          })
        })

        it('can process the JSON payload from the provider', done => {
          const response = getLineSolutions(submissionDate)
          expect(response)
          .to.eventually.have.property('_links')
            .notify(done)
        })

        it('should validate the interactions and create a contract', () => {
          return provider.verify()
        })
      })
    })
  })

  // Write pact files to file
  after(() => {
    return provider.finalize()
  })
})
