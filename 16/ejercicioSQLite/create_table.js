const { options } = require("./options/sqliteDB");
const knex = require("knex")(options);

(async () => {
  try {
    await knex.schema.createTable("cars", (table) => {
      table.increments("id");
      table.string("name");
      table.integer("price");
    });
    console.log("Table cars created");
  } catch (err) {
    console.log(err);
  } finally {
    knex.destroy();
  }
})();

// // create table cars
// knex.schema.createTable('cars', table => {
//     table.increments('id');
//     table.string('name');
//     table.integer('price');
// })
// .then(() => {
//     console.log('Table cars created');
// })
// .catch(err => {
//     console.log(err);
// })
// .finally(() => {
//     knex.destroy();
// });
