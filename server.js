
const express = require('express')

const app = express()
app.set('port', 8080)

// static resource
app.use('/', express.static('./dist'))
// import fe library
app.use('/lib', [
  express.static('./node_modules/vue/dist'),
])

app.listen(app.get('port'))
console.log(`Server running at ${app.get('port')}`)
