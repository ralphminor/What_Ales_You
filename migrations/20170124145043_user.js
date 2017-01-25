exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(users) {
    users.increments('id').primary();
    users.string('username');
    users.string('first_name');
    users.string('last_name');
    users.string('email');
    users.string('password');
    users.boolean('is_admin');
    users.string('oauth_provider');
    users.string('oauth_id');
    users.date('dob');
    users.string('address1');
    users.string('address2');
    users.string('city');
    users.string('state');
    users.string('zip');
    users.string('phone');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
