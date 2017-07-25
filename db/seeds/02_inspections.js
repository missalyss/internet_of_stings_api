
exports.seed = function(knex, Promise) {
  return knex('inspections').del()
    .then(function () {
      return knex('inspections').insert([
        
      ])
    })
    .then(function () {
      return knex.raw(
        "SELECT setval('inspections_id_seq', (SELECT MAX (id) FROM inspections))"
      )
    }).catch(function (error) {
      console.error("Red Alert! ", error)
    })
}
