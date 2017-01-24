
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contact_info').del()
    .then(function () {
      const contact_obj = [{
        first_name: 'Steve',
        last_name: 'VanWoerkom',
        dob: '1992-04-02',
        address: 'Denver',
        phone: 1234567
      }]
      return knex('contact_info').insert(contact_obj);
    });
};
