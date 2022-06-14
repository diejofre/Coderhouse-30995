const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("datos", {
    nombre: "coder",
    apellido: "house",
    edad: 26,
    email: "",
    telefono: "12345678",
  });
});

app.listen(8080);
