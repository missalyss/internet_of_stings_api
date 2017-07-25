
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, email: 'demo@demo.com', username: 'demo', hashed_password: '$2a$12$Y.3f3yY.0X9lscXZUCmZ..PAK7kG7Wf/8sg00AXMs.UiiZfJCptz2'},
        {id: 2, email: 'missalyss@email.com', username: 'missalyss', hashed_password: '$2a$12$Y.3f3yY.0X9lscXZUCmZ..PAK7kG7Wf/8sg00AXMs.UiiZfJCptz2'}
      ])
    })
    .then(function () {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX (id) FROM users))"
      )
    }).catch(function (error) {
      console.error("Red Alert! ", error)
    })
}
