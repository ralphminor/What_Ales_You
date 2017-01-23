
exports.up = function(knex, Promise) {
  return knex.schema.createTable('visit', function(visit) {
    visit.increments('id');
    visit.integer('user_id')//.inTable('login_info').references('id');
    visit.date('visit_date');
    visit.boolean('favorites');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('visit');
};
