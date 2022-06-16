const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/datos", function (req, res) {
  let cliente = req.query;
  res.render("datos.pug", {
    titleTable: "Datos personales",
    Nombre: cliente.nombre,
    Apellido: cliente.apellido,
    Edad: cliente.edad,
  });
});

app.listen(8080);
