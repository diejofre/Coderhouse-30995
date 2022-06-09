const express = require("express");
const router = require("./routes.js");

const app = express();

app.use(express.json()); //MW
app.use("/api", router); //middleware

app.listen(8080, () => {
  console.log("Server up");
});
