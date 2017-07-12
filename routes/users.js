const bcrypt = require('bcrypt-as-promised')
const express = require('express')
const knex = require('../db/connection')
const router = express.Router()
const jwt = require('jwt-simple');

// LOGIN
router.post('/login', (req, res, next) => {
  const { username, password } = req.body
  let user

  knex('users').where('username', username).first().then((row) => {
      user = row
      console.log(user, row);
      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      delete user.hashed_password
      let token = jwt.encode(user, process.env.JWT_TOKEN)
      res.json({success: true, token: 'JWT ' + token, user:user})
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
      res.json({success: true, token: 'JWT ' + token, user:user})
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router
