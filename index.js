const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const publicPath = path.join(__dirname, 'public')
const staticMiddleware = express.static(publicPath)
const multer = require('multer')
const upload = multer({ dest: 'public/images' })

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

app.post('/clients', upload.single('picture'), function (req, res) {
  const client = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    intake_date: req.body.intake_date,
    picture: req.file.filename
  }
  const query = knex
    .insert(client)
    .into('clients')
    .returning('*')
  query
    .then((client) => {
      res.json(client[0])
      console.log('done!')
    })
})

function getClientById(id) {
  const query = knex
    .where('id', id)
    .select()
    .from('clients')
    .first()
  return query
}

app.get('/clients/:id', function (req, res) {
  const clientId = parseInt(req.params.id, 10)
  console.log(clientId)
  getClientById(clientId)
  .then(client => {
    res.json(client)
    console.log(client)
  })
})

app.get('/notes', function (req, res) {
  const query = knex
    .select()
    .from('notes')
  query
    .then((notes) => {
      res.json(notes)
    })
})

app.post('/notes', function (req, res) {
  const note = {
    note_date: req.body.note_date,
    note_text: req.body.note_text,
    note_type: req.body.note_type,
    clients_id: req.body.clients_id
  }
  const query = knex
    .insert(note)
    .into('notes')
    .returning('*')
  query
  .then(note => {
    res.json(note[0])
    console.log('done!')
  })
})

app.use(staticMiddleware)

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
