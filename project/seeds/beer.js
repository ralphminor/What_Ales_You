
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      const beer_obj = [{
        brewery: 'Alpine Dog',
        beer_name: 'Super Steeze Pale Ale',
        style: 'Hoppy Belgian-Style Pale Ale',
        abv: '5.8',
        rating: '4',
        review: 'sample review, sample review'
      },
      {
        brewery: 'Alpine Dog',
        beer_name: 'Miss American Rye Rye',
        style: 'Blonde Ale',
        abv: '5.5',
        rating: '3',
        review: 'sample review, sample review'
      },
      {
        brewery: 'Ration',
        beer_name: 'Hold Steady',
        style: 'Chocolate Rye Scotch Ale',
        abv: '7.5',
        rating: '5',
        review: 'sample review, sample review'
      },
    ];
      return knex('beer').insert(beer_obj);
    });
};
