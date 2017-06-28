var express = require('express');
var router = express.Router();
const knex = require('../db/connection')

// INDEX STATS
router.get('/', function(req, res, next) {
  knex('humiture').then(allStats => {
    res.json(allStats)
  })
})

// SHOW STAT
router.get('/:id', function(req, res, next) {
  const id = req.params.id
  knex('humiture').where({id}).then(thisStat => {
    res.json(thisStat)
  })
})

// CREATE STAT
router.post('/', function(req, res, next) {
  knex('humiture').insert(req.body, '*').then(newStat => {
    res.json(newStat)
  })
})

// UPDATE SYMPTOM
router.put('/:id', function(req, res, next) {
  const id = req.params.id
  knex('humiture').where({id}).update(req.body, '*').then(updatedStat => {
    res.json(updatedStat)
  })
})

// DESTROY SYMPTOM
router.delete('/:id', function(req, res, next) {
  const id = req.params.id
  knex('humiture').where({id}).del().then(() => {
    res.send()
  })
})

module.exports = router;
