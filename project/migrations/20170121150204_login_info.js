
exports.up = function(knex, Promise) {
  return knex.schema.createTable('login_info', function(login) {
    login.increments('id');
    login.string('user_name');
    login.string('password_hash');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('login_info');
};
