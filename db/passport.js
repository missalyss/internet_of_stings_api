const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const knex = require('./connection')

module.exports = function(passport) {
  var jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
  jwtOptions.secretOrKey = process.env.JWT_TOKEN

  passport.use(new JwtStrategy(jwtOptions,
    function(jwt_payload, done) {
    knex('users').where('id', jwt_payload.id).then((user) => {
      if (user) {
        done(null, user)
      } else {
        done(null, false, {message: 'No user'})
      }
    }).catch(err => {
      console.error(err)
    })
  }))
}
