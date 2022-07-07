const { options } = require('./options/mariaDB');
const knex = require('knex')(options);

const createTable = (async () => {
    try {
        if(await knex.schema.hasTable('articulos')){
            await knex.schema.dropTable('articulos');
        }
        await knex.schema.createTable('articulos', table => {
            table.increments('id');
            table.string('nombre', 15);
            table.string('codigo', 10);
            table.float('precio');
            table.integer('stock');
        });
        console.log('Table articulos created');
    } catch (err) {
        console.log(err);
    } finally {
        knex.destroy();
    }
});


module.exports = {
    createTable
};