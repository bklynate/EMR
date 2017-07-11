const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/emrnow'
})

app.use(jsonParser)

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

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
