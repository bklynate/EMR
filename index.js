const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/emrnow'
})
