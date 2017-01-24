exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brewery').del()
    .then(function () {
      const brewery_obj = [{
        name: 'Alpine Dog',
        website: 'http://www.alpinedogbrewery.com',
        address1: '1505 Odgen St.',
        address2: '',
        city: 'Denver',
        state: 'CO',
        zip:  '80218',
        phone: '7202145170'
      },
      {
        name: 'Ratio',
        website: 'http://www.ratiobeerworks.com',
        address1: '2920 Larimer St',
        address2: '',
        city: 'Denver',
        state: 'CO',
        zip:  '80205',
        phone: '3039978288'
      }]
      return knex('brewery').insert(brewery_obj);
    });
};
