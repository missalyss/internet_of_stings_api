const express = require('express')
const router = express.Router()
const knex = require('../db/connection')

// INDEX LOGS
router.get('/', function(req, res, next) {
  knex('inspections').then(allLogs => {
    res.json(allLogs)
  })
})

// SHOW LOG
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  knex('inspections').where({id}).then(thisLog => {
    res.json(thisLog)
  })
})

// CREATE LOG
router.post('/', function(req, res, next) {
  knex('inspections').insert(req.body, '*').then(newLog => {
    res.json(newLog)
  })
})

// UPDATE LOG
router.put('/:id', function(req, res, next) {
  const id = req.params.id
  knex('inspections').where({id}).update(req.body, '*').then(updatedLog => {
    res.json(updatedLog)
  })
})

// DESTROY LOG
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  knex('inspections').where({id}).del().then(() => {
    res.send()
  })
})

module.exports = router
