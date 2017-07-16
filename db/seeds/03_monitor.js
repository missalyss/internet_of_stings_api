
exports.seed = function(knex, Promise) {
  return knex('humiture').del()
    .then(function () {
      return knex('humiture').insert([
        // Intentionally left blank so that testing data coming in from the pi can be dropped easily.
     ])
    })
}
