const express = require('express')
const router = express.Router()
const knex = require('../db/connection')
const jwt = require('jwt-simple');
const passport = require('passport')
require('../db/passport')(passport)

// INDEX STATS
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)

    knex('humiture').where('user_id', decoded.id).then(allStats => {
      res.json(allStats)
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})


// SHOW STAT
router.get('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const id = req.params.id
  knex('humiture').where({id}).then(thisStat => {
    res.json(thisStat)
  })
})

// CREATE STAT
// router.post('/', passport.authenticate('jwt', {session: false}), function(req, res, next) {
//   knex('humiture').insert(req.body, '*').then(newStat => {
//     res.json(newStat)
//   })
// })

// UPDATE STAT
// router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
//   const id = req.params.id
//   knex('humiture').where({id}).update(req.body, '*').then(updatedStat => {
//     res.json(updatedStat)
//   })
// })

// DESTROY STAT
router.delete('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  const id = req.params.id
  knex('humiture').where({id}).del().then(() => {
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
