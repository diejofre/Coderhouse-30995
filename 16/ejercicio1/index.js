const { createTable } = require('./create_table');
const { selectArticulos } = require('./select_articulos');
const { deleteArticulo } = require('./delete_articulo');
const { updateArticulo } = require('./update_articulo');
const { insertArticulos } = require('./insert_articulos');

try {
    createTable();
    selectArticulos();
    deleteArticulo();
    updateArticulo();
    
} catch (err) {
    console.log(err);
}
