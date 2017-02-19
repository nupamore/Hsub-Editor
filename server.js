
const express = require('express')

const app = express()
app.set('port', 8080)

// static resource
app.use('/', express.static('./dist'))
app.use('/subs', express.static('./subs'))
// import fe library
app.use('/lib', [
  express.static('./node_modules/vue/dist'),
  express.static('./node_modules/video.js/dist'),
  express.static('./node_modules/videojs-youtube/dist'),
  express.static('./node_modules/videojs-ass/src'),
  express.static('./node_modules/libjass'),
])

app.listen(app.get('port'))
console.log(`Server running at ${app.get('port')}`)
