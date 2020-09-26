#!/usr/bin/env node

// Get args
let args = process.argv.slice(2).map(x => x.toLowerCase().trim())

// Notify kabel
if (args[0] === 'notify') {

  const url = args[1]
  if (!url) {
    console.log(`\nUsage: kabel notify <url>`)
    console.log(`Example: kabel notify http://localhost:3900?name=app\n`)
    process.exit(0)
  }

  const request = require('../lib/request.js')

  request({ url })

} else {

  // Extract options
  const options = {}

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-p': options.port = parseInt(args[i + 1]); break
      case '-w': options.wait = parseInt(args[i + 1]); break
      case '-q': options.quiet = true; break
    }
  }

  if (options.port) {
    process.env.KABEL_PORT = options.port
  }

  if (options.wait) {
    process.env.KABEL_WAIT = options.wait
  }

  if (options.quiet) {
    process.env.KABEL_QUIET = options.quiet
  }

  // Start web server
  require('../index.js')
}