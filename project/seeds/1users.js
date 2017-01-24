exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      const users_obj = [{
        username: 'ralph.purchase@icloud.com',
        first_name: 'Ralph',
        last_name: 'Minor',
        email: 'ralph.purchase@icloud.com',
        password: 'test',
        is_admin: false,
        oauth_provider: '',
        oauth_id: '',
        dob: '1967-03-15',
        address1: '1630 N Clarkson St APT 320',
        address2: '',
        city: 'Denver',
        state: 'CO',
        zip:  '80218',
        phone: '3039035223'
      }]
      return knex('users').insert(users_obj);
    });
};
