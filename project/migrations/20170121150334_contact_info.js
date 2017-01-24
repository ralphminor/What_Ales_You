
exports.up = function(knex, Promise) {
  return knex.schema.createTable('contact_info', function(contact) {
    contact.increments('id');
    contact.string('first_name');
    contact.string('last_name');
    contact.date('dob');
    contact.string('address');
    contact.integer('phone');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('contact_info')
};
