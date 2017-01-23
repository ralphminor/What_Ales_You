
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('login_info').del()
    .then(function () {
      const login_obj = [{
        user_name: 'Subtlesnow',
        first_name: 'Steve',
        last_name: 'VanWoerkom',
        email: 'subtleride@gmail.com',
        password_hash: 'secretsecret'
      }]
      return knex('login_info').insert(login_obj);
    });
};
