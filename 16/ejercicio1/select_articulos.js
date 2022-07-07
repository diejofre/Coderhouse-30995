const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

// SELECT * FROM articulos
const selectArticulos = knex.from('articulos').select("*")
    .then(rows => {
        console.log(rows);
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });

module.exports = {
    selectArticulos
};
