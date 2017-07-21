'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments()
    t.string('email').unique().notNullable()
    t.string('username').unique().notNullable()
    t.specificType('hashed_password', 'char(60)').notNullable()
    t.timestamps(true, true)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
