
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('visit').del()
    .then(function () {
      const visit_obj = [{
        user_id: 1,
        visit_date: new Date(),
        favorites: true
      }];
      return knex('visit').insert(visit_obj);
    });
};
