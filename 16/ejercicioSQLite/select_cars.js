const { options } = require("./options/sqliteDB");
const knex = require("knex")(options);

// SELECT * FROM cars
knex
  .from("cars")
  .select("*")
  .orderBy("price", "desc")
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
