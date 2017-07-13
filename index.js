const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/emrnow'
})

app.use(jsonParser)

app.get('/clients', function (req, res) {
  const query = knex
    .select()
    .from('clients')
  query
    .then((clients) => {
      res.json(clients)
    })
})

app.post('/clients', function (req, res) {
  const query = knex
    .insert(req.body)
    .into('clients')
    .returning('*')
  query
    .then((client) => {
      res.json(client[0])
      console.log('done!')
    })
})

app.use(staticMiddleware)

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
