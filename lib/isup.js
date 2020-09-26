const net = require('net')
const URL = require('url').URL

module.exports = async function(options = {}) {
  const { url, timeout = 100 } = options
  const { hostname, port } = new URL(url)

  while(true) {
    try {
      return await new Promise(function(resolve, reject) {
        const socket = net.createConnection(port, hostname, function() {
          resolve()
          socket.end()
        })
        socket.on('error', function(err) {
          reject(err)
        })
      })
    } catch(e) {
      process.stdout.write('.')
      await new Promise(r => setTimeout(r, timeout))
    }
  }
}
