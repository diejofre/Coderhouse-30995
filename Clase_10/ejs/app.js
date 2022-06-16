const express = require("express");
const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/datos", (req, res) => {
  res.render("layout", req.query);
});

app.listen(8080);
