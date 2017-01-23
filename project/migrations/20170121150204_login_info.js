
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login_info', function(login) {
    login.increments('id').primary();
    login.string('username');
    login.string('first_name');
    login.string('last_name');
    login.string('email');
    login.string('password');
    login.boolean('is_admin');
    login.string('oauth_provider');
    login.string('oauth_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('login_info');
};
