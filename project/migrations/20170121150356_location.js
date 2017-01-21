
exports.up = function(knex, Promise) {
  return knex.schema.createTable('location', function(location) {
    location.increments('id');
    location.string('name');
    location.string('type');
    location.boolean('outdoor_seating');
    location.boolean('happy_hour');
    location.boolean('food');
    location.string('website');
    location.string('address');
    location.integer('rating');
    location.string('review');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('location');
};
