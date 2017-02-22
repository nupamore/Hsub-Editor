
const express = require('express')
const path = require('path')


const app = express()
app.set('port', 8080)

// static resource
app.use('/js', express.static('./dist/js'))
app.use('/css', express.static('./dist/css'))
app.use('/subs', express.static('./subs'))

// view engine
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'dist'))

// theme
app.get('/:theme', (req, res) => {
  const { theme } = req.params
  res.render('index', { theme })
})

app.listen(app.get('port'))
console.log(`Server running at ${app.get('port')}`)
