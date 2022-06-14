const express = require("express");
const { promises: fs } = require("fs");

const app = express();

app.engine("cte", async (filePath, options, callback) => {
  try {
    const content = await fs.readFile(filePath);
    const rendered = content
      .toString()
      .replace("^^titulo$$", "" + options.titulo + "")
      .replace("^^mensaje$$", "" + options.mensaje + "")
      .replace("^^autor$$", "" + options.autor + "")
      .replace("^^version$$", "" + options.version + "")
      .replace("^^nombre$$", "" + options.nombre + "")
      .replace("^^apellido$$", "" + options.apellido + "")
      .replace("^^fechaYHora$$", "" + options.fechaYHora + "");
    return callback(null, rendered);
  } catch (err) {
    return callback(new Error(err));
  }
});

app.set("views", "./views");

app.set("view engine", "cte");

app.get("/", (req, res) => {
  const datos = {
    titulo: "algún título en string",
    mensaje: "algún mensaje en string",
    autor: "algun autor en string",
    version: "algun numero",
  };

  res.render("plantilla1", datos);
});

app.get("/cte2", (req, res) => {
  const datos = {
    nombre: "Diego",
    apellido: "Jofre",
    fechaYHora: new Date(),
  };

  res.render("plantilla2", datos);
});

app.listen(8080);
