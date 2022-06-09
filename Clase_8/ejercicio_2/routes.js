const express = require("express");
const { Router } = express;

const router = Router();

const mascotas = [];
const personas = [];

router.use(function (req, res, next) {
  console.log("/api Time:", Date.now());
  next();
});

router
  .route("/mascotas")
  .get((req, res) => {
    throw new Error("Algo se rompio");
    res.send(mascotas);
  })
  .post((req, res) => {
    const mascota = req.body;
    mascotas.push(mascota);
    res.sendStatus(201);
  });

router.get("/personas", (req, res) => {
  res.send(personas);
});

router.post("/personas", (req, res) => {
  const persona = req.body;
  personas.push(persona);
  res.sendStatus(201);
});

module.exports = router;
