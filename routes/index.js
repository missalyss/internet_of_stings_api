const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index')
})

module.exports = router
