
exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer', function(beer) {
    beer.increments('id');
    beer.string('brewery');
    beer.string('beer_name');
    beer.string('style');
    beer.decimal('abv');
    beer.integer('rating');
    beer.string('review');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('beer');
};
