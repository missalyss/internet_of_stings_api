
exports.seed = function(knex, Promise) {
  return knex('inspections').del()
    .then(function () {
      return knex('inspections').insert([
        {id: 1, inspection_date: '7-7-17', queen: true, honey: false, temperment: 5, user_id: 1},
        {id: 2, inspection_date: '7-17-17', queen: true, honey: true, temperment: 0, user_id: 2},
        {id: 3, inspection_date: '6-7-17', queen: true, honey: false, temperment: 2, user_id: 1}
      ])
    })
}
