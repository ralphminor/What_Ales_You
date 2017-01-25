exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      const beer_obj = [{
        brewery_id: 1,
        name: 'Super Steeze Pale Ale',
        style: 'Hoppy Belgian-Style Pale Ale',
        abv: '5.8'
      },
      {
        brewery_id: 1,
        name: 'Miss American Rye Rye',
        style: 'Blonde Ale',
        abv: '5.5'
      },
      {
        brewery_id: 2,
        name: 'Hold Steady',
        style: 'Chocolate Rye Scotch Ale',
        abv: '7.5'
      },
    ];
      return knex('beer').insert(beer_obj);
    });
};
