const express = require("express");
const app = express(); //instancia el servidor en app

//Ejercicio 1

// const frase = "Hola mundo cómo están";

// app.get("/api/frase", (req, res) => {
//   res.json({ frase });
// });

// app.get("/api/letras/:num", (req, res) => {
//   const numero = req.params.num;
//   if (isNaN(numero)) {
//     res.json({ error: "El parámetro no es un número" });
//   }
//   if (numero > frase.length || numero < 1) {
//     res.json({ error: "El parámetro está fuera de rango" });
//   }
//   res.json({ letra: frase[numero - 1] });
// });

// app.get("/api/palabras/:num", (req, res) => {
//   const numero = req.params.num;
//   const palabras = frase.split(" ");
//   if (isNaN(numero)) {
//     res.json({ error: "El parámetro no es un número" });
//   }
//   if (numero > palabras.length || numero < 1) {
//     res.json({ error: "El parámetro está fuera de rango" });
//   }
//   res.json({ palabra: palabras[numero - 1] });
// });

// Ejercicio 2

// app.get("/api/sumar/:num1/:num2", (req, res) => {
//   const num1 = Number(req.params.num1);
//   const num2 = Number(req.params.num2);

//   res.json({ result: num1 + num2 });
// });

// app.get("/api/sumar", (req, res) => {
//   const num1 = Number(req.query.num1);
//   const num2 = Number(req.query.num2);
//   res.json({ result: num1 + num2 });
// });

// app.get("/api/sumar/:suma", (req, res) => {
//   const [num1, num2] = req.params.suma.split("+");
//   res.json({ result: Number(num1) + Number(num2) });
// });

// Ejercicio 3

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "Frase inicial";

app.get("/api/frase", (req, res) => {
  res.json({ frase });
});

app.get("/api/frase/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabras = frase.split(" ");
  res.json({ buscada: palabras[posicion - 1] });
});

app.post("/api/palabras", (req, res) => {
  const palabra = req.body.palabra;
  const palabras = frase.split(" ");
  const posicion = palabras.push(palabra);
  frase = palabras.join(" ");
  res.json({
    agregada: palabra,
    pos: posicion,
  });
});

app.put("/api/palabras/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabraRecibida = req.body.palabra;
  const palabras = frase.split(" ");
  const palabraARemplazar = palabras[posicion - 1];
  frase = frase.replace(palabraARemplazar, palabraRecibida);
  res.json({
    actualizada: palabraRecibida,
    anterior: palabraARemplazar,
  });
});

app.delete("/api/palabras/:pos", (req, res) => {
  const posicion = req.params.pos;
  const palabras = frase.split(" ");
  palabras.splice(posicion - 1, 1);
  frase = palabras.join(" ");
  res.sendStatus(204);
});

app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
});
