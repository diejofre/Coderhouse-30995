const express = require("express");
const { Router } = express;

const router = Router();

router.get("/recurso", (req, res) => {
  res.send("get ok");
});

router.post("/recurso", (req, res) => {
  res.send("post ok");
});

module.exports = router;
