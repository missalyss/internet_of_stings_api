'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('humiture', function(t){
    t.increments()
    t.integer('temperature').notNullable()
    t.integer('humidity').notNullable()
    t.string('date_recorded')
    t.timestamps(true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('humiture')
}
