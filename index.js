const Sirloin = require('sirloin')
const isup = require('./lib/isup.js')

const port = process.env.KABEL_PORT || 3900
const wait = process.env.KABEL_WAIT || 100 // milliseconds
const quiet = !!parseInt(process.env.KABEL_QUIET) || false

const DEBUG = false

const app = new Sirloin({ port })

/**
* Usage from browser:
var ws = new WebSocket('ws://localhost:3900')
ws.onopen = function() {
  var data = JSON.stringify({ name: 'admin' })
  console.log('Registering:', data)
}
ws.onmessage = function(e) {
  console.log('Received data:', e.data)
  window.location.reload(true)
}

ws.onerror = function() {
  console.log('Error connecting to kabel')
}
**/

function log(...args) {
  if (!quiet || DEBUG) console.log(...args)
}

app.action('*', async (data, client) => {
  log('* Websocket data received:\n', data)
  let { name, host = client.req.headers.origin } = data
  if (!name) {
    return log('\n! Error: Name is missing from websocket data:\n', data)
  }
  log(`\n* Registered app\n  Name: ${name}\n  Host: ${host || 'NA'}`)
  client.name = name
  client.host = host
})

app.post('*', async (req, res) => {
  log('* Post params received:\n', req.params)
  const { name } = req.params
  if (!name) {
    return log('\n! Error: Name is missing from post params:\n', req.params)
  }
  log('Processing app:', name)
  await new Promise(r => setTimeout(r, wait))
  for (const client of app.websocket.clients) {
    if (client.name === name) {
      if (client.host) {
        log('\n* Waiting for server to restart...')
        await isup({ url: client.host })
        log(' done!')
      }
      client.send(req.params)
    }
  }
  return "OK"
})
