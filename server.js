
const express = require('express')
const path = require('path')

const app = express()
app.set('port', 8080)

// static resource
app.use('/css', express.static('./dist/css'))
app.use('/js', express.static('./dist/js'))
app.use('/subs', express.static('./subs'))
// import fe library
app.use('/lib', [
  express.static('./node_modules/vue/dist'),
  express.static('./node_modules/video.js/dist'),
  express.static('./node_modules/videojs-youtube/dist'),
  express.static('./node_modules/videojs-ass/src'),
  express.static('./node_modules/libjass'),
])
// view engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'dist'))

// theme
app.get('/:theme', (req, res) => {
  const theme = req.params.theme
  res.render('theme', { theme })
})

app.listen(app.get('port'))
console.log(`Server running at ${app.get('port')}`)
