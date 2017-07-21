
exports.seed = function(knex, Promise) {
  return knex('inspections').del()
    .then(function () {
      return knex('inspections').insert([
        {id: 1, inspection_date: 'Fri Jun 9 2017 10:20:41', brood_age: 'egg', egg_pattern: '4', temperment: 2, queen: true, notes: "The Collective seems to be doing pretty okay", user_id: 1},
        {id: 2, inspection_date: 'Fri Jun 30 2017 10:20:41', brood_age: 'med_larva', egg_pattern: '2', temperment: 2, queen: true, notes: "Not sure why the queen's laying has gotten off. Saw her with many attendants", user_id: 1},
        {id: 3, inspection_date: 'Fri Jul 7 2017 10:44:04', brood_age: 'capped', egg_pattern: '0', temperment: 2, queen: false, notes: "Not seeing new eggs, not seeing queen. Where did she go?? Why happen?", user_id: 1}
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
