'use strict'

exports.up = function(knex, Promise) {
  return knex.schema.createTable('inspections', function(t){
    t.increments()
    t.string('inspection_date').notNullable()
    t.string('weather')
    t.string('brood_age')
    t.int('egg_pattern')
    t.int('temperment')
    t.boolean('queen')
    t.boolean('honey')
    t.text('notes')
    t.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('humiture')
}
