
exports.up = function(knex, Promise) {
  return knex.schema.createTable('visit', function(visit) {
    visit.increments('id');
    visit.integer('user_id').references('id').inTable('login_info');
    visit.date('visit_date');
    visit.boolean('favorites');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('visit');
};
