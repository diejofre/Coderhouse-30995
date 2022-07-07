const { options } = require('./options/mariaDB');
const knex = require('knex')(options);


const updateArticulo = knex.from('articulos').where({id: 2}).update({stock: 0})
    .then(() => console.log('articulo actualizado'))
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });

module.exports = {
    updateArticulo
};