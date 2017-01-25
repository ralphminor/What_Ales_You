exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasting', function(tasting) {
    tasting.increments('id');
    tasting.integer('user_id').references('id').inTable('users');
    tasting.date('date');
    tasting.boolean('location_favorited');
    tasting.boolean('beer_favorited');
    tasting.integer('beer_id').references('id').inTable('beer');
    tasting.integer('brewery_id').references('id').inTable('brewery');
    tasting.integer('beer_rating');
    tasting.integer('brewery_rating');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasting');
};
