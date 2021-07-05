const express = require('express')

const app = express()

app.use(express.static('public'))
app.set('view engine', 'pug')


app.get('/', (req, res) => {
    res.render('index', { title: 'Node app'})
})

app.listen(3000, () => {

})
