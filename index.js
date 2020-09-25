const Sirloin = require('sirloin')

const port = process.env.KABEL_PORT || 3900
const wait = process.env.KABEL_WAIT || 300 // milliseconds
const verbose = process.env.KABEL_VERBOSE || false

const app = new Sirloin({ port })

/**
* Usage from browser:
var ws = new WebSocket('ws://localhost:3900')
ws.onopen = function() {
  var data = JSON.stringify({ name: 'admin' })
  console.log('Registering:', data)
  ws.send(data)
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
  if (verbose) console.log(...args)
}

app.action('*', async (data, client) => {
  const { name } = data
  if (!name) return
  log('Registered app:', name)
  client.name = name
})

app.post('*', async (req, res) => {
  log('Message received:', req.params)
  const { name } = req.params
  if (!name) return
  log('App name:', name)
  await new Promise(r => setTimeout(r, wait))
  app.websocket.clients.forEach(c => {
    if (c.name === name) {
      c.send({ hello: name })
    }
  })
})
