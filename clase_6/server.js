const express = require("express");
const app = express();

// let visitas = 0;
app.get("/", (req, res) => {
  res.send("<h1 style='color: blue'>Bienvenidos al servidor express</h1>");
});

let visitas = 0;
app.get("/visitas", (req, res) => {
  visitas++;
  res.send(`La cantidad de visitas es ${visitas}`);
});

app.get("/fyh", (req, res) => {
  res.send({
    fyh: `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto 3000`);
});
