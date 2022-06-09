const express = require("express");
const router = require("./routes.js");

const app = express();

app.use("/static", express.static(__dirname + "/public"));

app.use(express.json());
app.use("/api", router); //middleware

app.listen(8080);
