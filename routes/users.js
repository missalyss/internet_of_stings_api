const bcrypt = require('bcrypt-as-promised')
const express = require('express')
const knex = require('../db/connection')
const router = express.Router()
const jwt = require('jwt-simple');

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
      res.json(user)
    })
    .catch((err) => {
      next(err)
    })
})

// // route to authenticate a user (POST http://localhost:8080/api/authenticate)
// router.post('/login', function(req, res) {
//   User.findOne({ // knex('users').where(email: req.body.email).first()
//     name: req.body.name
//   }, function(err, user) {
//     if (err) throw err
//     } else {
//       user.comparePassword(req.body.password, function (err, isMatch) {
//         if (isMatch && !err) {
//           // if user is found and password is right create a token
//           var token = jwt.encode(user, config.secret)
//           // return the information including token as JSON
//           res.json({success: true, token: 'JWT ' + token})
//         } else {
//           res.send({success: false, msg: 'Authentication failed. Wrong password.'})
//         }
//       })
//     }
//   })
// })

// LOGIN
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  let user

  knex('users').where('email', email).first().then((row) => {
      user = row
      return bcrypt.compare(password, user.hashed_password)
    })
    .then(() => {
      delete user.hashed_password
      let token = jwt.encode(user, process.env.JWT_TOKEN)
      res.json({success: true, token: 'JWT ' + token})
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw {
        status: 400,
        message: 'Bad email or password'
      }
    })
    .catch((err) => {
      next(err)
    })
})


module.exports = router
