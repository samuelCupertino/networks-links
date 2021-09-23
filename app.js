const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(__dirname + '/views'))

app.get('/[a-z]{0,}', (req, res) => res.render('networks'))

app.listen(8080, ()=> console.log('server on!'))