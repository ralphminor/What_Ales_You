exports.up = function(knex, Promise) {
  return knex.schema.createTable('brewery', function(brewery) {
    brewery.increments('id');
    brewery.string('name');
    brewery.string('address1');
    brewery.string('address2');
    brewery.string('city');
    brewery.string('state');
    brewery.string('zip');
    brewery.string('phone');
    brewery.string('website');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('brewery');
};
