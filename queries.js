const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

module.exports = {
    getTates: function(){
      return knex('taste_test')
    },
    insertTaste: function(newTaste) {
        knex.insert(newTaste).into('taste_test')
        .then(function (id) {
            console.log(id)
        })
        .catch(function(err) {
            console.log(err)
            knex.destroy();
        })
    }
};
