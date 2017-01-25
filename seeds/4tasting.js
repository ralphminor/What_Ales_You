exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasting').del()
    .then(function () {
      const tasting_obj = [{
        user_id: 1,
        date: '2016-03-15',
        location_favorited: true,
        beer_favorited: true,
        beer_id: 1,
        brewery_id: 1,
        beer_rating: 5,
        brewery_rating: 5
      }];
      return knex('tasting').insert(tasting_obj);
    });
};
