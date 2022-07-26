const express = require("express");
const app = express();

const nombres = ["Luis", "Lucía", "Juan", "Augusto", "Ana"];
const apellidos = ["Pieres", "Cacurri", "Bezzola", "Alberca", "Mei"];
const colores = ["rojo", "verde", "azul", "amarillo", "magenta"];

app.get("/test", (req, res) => {
  const datos = [];
  for (let i = 0; i < 10; i++) {
    const dato = {
      nombre: nombres[Math.round(Math.random() * (nombres.length - 1))],
      apellido: apellidos[Math.round(Math.random() * (apellidos.length - 1))],
      color: colores[Math.round(Math.random() * (colores.length - 1))],
    };
    datos.push(dato);
  }
  res.status(200).json({ datos });
});

app.listen(3000, () => {
  console.log("Server up");
});
