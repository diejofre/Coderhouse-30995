const express = require("express");
const app = express();
const morgan = require("morgan");
const routes = require('./routes');

app.use(morgan("tiny")); // Esta es la forma simplificada de Morgan.

app.use(express.json());

app.use('/api', routes);

app.listen(8080, () => {
  console.log("Servidor corriendo en el puerto 8080");
});
