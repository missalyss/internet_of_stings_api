const bcrypt = require('bcrypt-as-promised')
const express = require('express')
const knex = require('../db/connection')
const router = express.Router()
const jwt = require('jwt-simple')
const passport = require('passport')
require('../db/passport')(passport)

// GET USER DATA
router.get('/', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)

    knex('users').where('id', decoded.id).first().then(thisUser => {
      delete thisUser.hashed_password
      res.json(thisUser)
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})

// EDIT USER

router.put('/', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)

    knex('users').where('id', decoded.id).update(req.body).then(thisUser => {
      delete thisUser.hashed_password
      res.json(thisUser)
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})

// DELETE ACCOUNT
router.delete('/', passport.authenticate('jwt', {session: false}),
function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    var decoded = jwt.decode(token, process.env.JWT_TOKEN)

    knex('users').where('id', decoded.id).del().then(() => {
      console.log('user "deleted"');
      res.status(200).json({msg: 'User gone forever'})
    })
  } else {
    return res.status(403).json({success: false, msg: 'No token provided.'})
  }
})

// LOGIN
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  let user

  if (!username || !username.trim()) {
   return next({ status: 400, message: 'Username must not be blank' })
 }

 if (!password) {
   return next({ status: 400, message: 'Password must not be blank' })
 }

  knex('users').where('username', username).first().then((row) => {
      user = row
      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      delete user.hashed_password
      let token = jwt.encode(user, process.env.JWT_TOKEN)
      res.json({success: true, token: 'JWT ' + token, user: user})
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw {
        status: 400,
        message: 'Bad username or password'
      }
    })
    .catch((err) => {
      next(err)
    })
})

// SIGN UP
router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          email: req.body.email,
          username: req.body.username,
          hashed_password: hashed_password
        }, '*')
    })
    .then((users) => {
      const user = users[0]
      delete user.hashed_password
      let token = jwt.encode(user, process.env.JWT_TOKEN)
      res.json({success: true, token: 'JWT ' + token})
    })
    .catch((err) => {
      next(err)
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
