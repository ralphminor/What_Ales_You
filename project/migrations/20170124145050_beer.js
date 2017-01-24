exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer', function(beer) {
    beer.increments('id');
    beer.integer('brewery_id').references('id').inTable('brewery');
    beer.string('name');
    beer.string('style');
    beer.decimal('abv');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('beer');
};
