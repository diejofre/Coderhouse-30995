const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

// SELECT * FROM cars
knex
  .from("cars")
  .where({ name: "Volkswagen" })
  .update({ price: 10000 })
  .then(() => console.log("Car updated"))
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
