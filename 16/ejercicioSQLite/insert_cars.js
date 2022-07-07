const { options } = require("./options/sqliteDB");
const knex = require("knex")(options);

const cars = [
  { name: "Ferrari", price: 20000000 },
  { name: "Lamborghini", price: 30000000 },
  { name: "Bugatti", price: 40000000 },
  { name: "Porsche", price: 50000000 },
  { name: "Mercedes", price: 60000000 },
  { name: "Audi", price: 70000000 },
  { name: "BMW", price: 80000000 },
  { name: "Volkswagen", price: 90000000 },
];

// insert cars to BD
knex("cars")
  .insert(cars)
  .then(() => {
    console.log("Cars inserted");
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });
