#!/usr/bin/env node

// Get args
let args = process.argv.slice(2).map(x => x.toLowerCase().trim())

// Extract options
const options = {}

for (let i = 0; i < args.length; i++) {
  switch (args[i]) {
    case '-p': options.port = parseInt(args[i + 1]); break
    case '-w': options.wait = parseInt(args[i + 1]); break
    case '-v': options.verbose = true; break
  }
}

if (options.port) {
  process.env.KABEL_PORT = options.port
}

if (options.wait) {
  process.env.KABEL_WAIT = options.wait
}

if (options.verbose) {
  process.env.KABEL_VERBOSE = options.verbose
}

// Start web server
require('../index.js')
