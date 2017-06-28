'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('humiture', function(t){
    t.increments()
    t.string('temperature').notNullable()
    t.string('humidity').notNullable()
    t.string('date_recorded')
    t.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('humiture')
}
