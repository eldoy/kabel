# Kabel
Server that relays messages to websocket clients (i.e. browsers). Useful for sending commands to applications via the command line, for example tell the browser to reload when a file changes.

### Installation
`npm i -g kabel`

### Setup autoreload for your web app

#### Start kabel
```bash
# Default port is 3900
kabel

# With different port as option
kabel -p 3010

# or with env variable
KABEL_PORT=3011 kabel

# You can also set the wait in ms before sending the message
kabel -w 500

# or with env variable
KABEL_WAIT=500 kabel

# Verbose output for output
kabel -v

# or with env variable
KABEL_VERBOSE=true
```
You only need one kabel server for all your apps.

#### Set up web socket connection
Include this on in your web app:
```html
<script>
  var ws = new WebSocket('ws://localhost:3900')
  ws.onopen = function() {
    // Change the name to the name of your app
    // The name should match what you're sending with curl
    ws.send(JSON.stringify({ name: 'app' }))
  }
  ws.onmessage = function() {
    window.location.reload(true)
  }
  ws.onerror = function() {
    console.log('Error connecting to kabel')
  }
</script>
```

#### Send a message to the browser via kabel
```
# From terminal
curl -X POST -d 'name=app' http://localhost:3900
```
Your app should now have reloaded.

#### Bonus: Automatic reload with nodemon
Create a `nodemon.json` file in your app root direcory that looks like this:
```json
{
  "events": {
    "restart": "curl -X POST -d 'name=app' http://localhost:3900"
   }
}
```
Your application will now reload every time nodemon restarts.

MIT licensed. Enjoy!

