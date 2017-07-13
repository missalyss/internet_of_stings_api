const express = require('express')
const router = express.Router()
const knex = require('../db/connection')
const jwt = require('jwt-simple');
const passport = require('passport')
require('../db/passport')(passport)

// INDEX LOGS
router.get('/', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)

    knex('inspections').where('user_id', decoded.id).then(allLogs => {
      res.json(allLogs)
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})

// SHOW LOG
router.get('/:id', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
    const id = req.params.id

    knex('inspections').where({id}).then(thisLog => {
      res.json(thisLog)
    })
})

// CREATE LOG
router.post('/', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)
    req.body.user_id = decoded.id

    knex('inspections').insert(req.body, '*').then(newLog => {
      res.json(newLog)
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})

// UPDATE LOG
router.put('/:id', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
    const id = req.params.id

    knex('inspections').where({id}).update(req.body, '*').then(updatedLog => {
      res.json(updatedLog)
    })
})

// DESTROY LOG
router.delete('/:id', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
    const id = req.params.id

    knex('inspections').where({id}).del().then(() => {
      res.send()
    })
})

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
    return headers.authorization
  } else {
    return null
  }
}

module.exports = router
