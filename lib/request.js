const http = require('http')
const URL = require('url').URL

const DEBUG = false

module.exports = function(options = {}) {
  const { url } = options
  const { hostname, port, searchParams } = new URL(url)

  // Extract data
  const data = {}
  for (const key of searchParams.keys()) {
    data[key] = searchParams.get(key)
  }

  const params = JSON.stringify(data)

  const config = {
    hostname,
    port,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const req = http.request(config, res => {
    if (DEBUG) console.log(`Status: ${res.statusCode}`)

    res.on('data', d => {
      if (DEBUG) process.stdout.write(d)
    })
  })

  req.on('error', err => {
    console.error(err)
  })

  req.write(params)
  req.end()
}
