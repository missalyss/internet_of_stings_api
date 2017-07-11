const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const knex = require('./connection')

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader()
  opts.token = process.env.JWT_TOKEN

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    knex('users').where({id: jwt_payload.id}).then(user => {
      if (user) {
          done(null, user)
      } else {
          done(null, false)
      }
    }).catch(err => {
      console.error(err)
    })
  }))
}
