const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const knex = require('knex')({
  dialect: 'pg',
  connection: 'postgres://localhost:5432/emrnow'
})

const query = knex
  .insert({ first_name: 'Vince', last_name: 'Lavang', intake_date: '07/11/2017' })
  .into('clients')

console.log(query.toString())

query
  .then(() => {
    console.log('done!')
  })
