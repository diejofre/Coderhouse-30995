const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

// add 5 articulos
const articulos = [
    {
        nombre: 'Coca-Cola',
        codigo: 'COCA-COLA',
        precio: 2.5,
        stock: 10
    },
    {
        nombre: 'Fanta',
        codigo: 'FANTA',
        precio: 2.5,
        stock: 10
    },
    {
        nombre: 'Sprite',
        codigo: 'SPRITE',
        precio: 2.5,
        stock: 10
    },
    {
        nombre: 'Pepsi',
        codigo: 'PEPSI',
        precio: 2.5,
        stock: 10
    },
    {
        nombre: '7Up',
        codigo: '7UP',
        precio: 2.5,
        stock: 10
    }
];

// insert articulos to BD
const insertArticulos = knex('articulos').insert(articulos)
    .then(() => {
        console.log('articulos inserted');
    })
    .catch(err => {
        console.log(err);
    })
    .finally(() => {
        knex.destroy();
    });

module.exports = {
    insertArticulos
};