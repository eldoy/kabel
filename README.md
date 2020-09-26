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

# Quiet output
kabel -q

# or with env variable
KABEL_QUIET=0
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

#### Automatic reload with nodemon
Create a `nodemon.json` file in your app root direcory that looks like this:
kabel.js notify 'http://localhost:3900?name=cfhqadmin'
```json
{
  "events": {
    "restart": "kabel notify 'http://localhost:3900?name=app'"
   }
}
```
Your application will now reload every time nodemon restarts.

Alternatively you can use `curl`:
```json
{
  "events": {
    "restart": "curl -X POST -d 'name=app' http://localhost:3900"
   }
}
```

#### Send a message to the browser via kabel
```
# From terminal using kabel
kabel notify 'http://localhost:3900?name=app'

# From terminal using curl
curl -X POST -d 'name=app' http://localhost:3900
```
Your app should now have reloaded.

### License
MIT licensed. Enjoy!
