import express from "express";
import { faker } from "@faker-js/faker";
faker.locale = "es";
const PORT = 8080;
const app = express();
let str = "NOMBRE;APELLIDO;COLOR;";
let id = 1;

app.get("/test", (req, res) => {
  const datos = [];
  for (let i = 0; i < req.query.count; i++) {
    const dato = {
      id: id++,
      nombre: faker.name.firstName(),
      apellido: faker.name.lastName(),
      color: faker.color.human(),
    };
    datos.push(dato);
  }
  res.status(200).json({ datos });
});

const server = app.listen(PORT, () => {
  console.log(`server funcionando en port http://localhost:${PORT}`);
});
server.on("error", (err) => console.error(err));
