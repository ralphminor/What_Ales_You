
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('location').del()
    .then(function () {
      const location_obj = [{
        name: 'Alpine Dog',
        type: 'Brewery',
        outdoor_seating: false,
        happy_hour: false,
        food: false,
        website: 'http://www.alpinedogbrewery.com/',
        address: '1505 Odgen St. Denver, Colorado 80218',
        rating: 3,
        review: 'sample review, sample review'
      }]
      return knex('location').insert(location_obj);
    });
};
