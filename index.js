const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/emrnow'
})

app.use(jsonParser)

app.get('/clients', function (req, res) {
  const query = knex
    .select()
    .from('clients')
  console.log(query.toString())
  query
    .then((clients) => {
      res.json(clients)
    })
})

app.post('/clients', function (req, res) {
  const query = knex
    .insert(req.body)
    .into('clients')
  query
    .then(() => {
      res.sendStatus(201)
      console.log('done!')
    })
})

app.use(staticMiddleware)

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
