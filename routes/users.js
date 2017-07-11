const bcrypt = require('bcrypt-as-promised');
const express = require('express')
const knex = require('../db/connection')
const router = express.Router()

/* GET users listing. */
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) => {
      return knex('users')
        .insert({
          email: req.body.email,
          username: req.body.username,
          hashed_password: hashed_password
        }, '*');
    })
    .then((users) => {
      const user = users[0];
      delete user.hashed_password;
      res.json(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
