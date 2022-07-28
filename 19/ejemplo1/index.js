import mongoose from "mongoose";
import { Usuario } from "./models/usuario.js";

CRUD();

async function CRUD() {
  try {
    mongoose.connect("mongodb://localhost:27017/mibase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a MongoDB");

    /* -------------------------------------------------------*/
    /* ------------------------- CREATE ----------------------*/
    /* -------------------------------------------------------*/

    console.log("CREATE");
    const usuarioData = {
      nombre: "Juan",
      apellido: "Perez",
      email: "jp@g.com",
      password: "123456",
    };

    const usuarioNuevo = new Usuario(usuarioData);
    await usuarioNuevo.save();
    console.log(usuarioNuevo);
    console.log("Usuario creado");

    /* -------------------------------------------------------*/
    /* ------------------------- READ ------------------------*/
    /* -------------------------------------------------------*/

    console.log("READ");
    const usuarios = await Usuario.find();
    console.log(usuarios);

    // /* -------------------------------------------------------*/
    // /* ------------------------- UPDATE ----------------------*/
    // /* -------------------------------------------------------*/

    // console.log("UPDATE");
    // const usuarioUpdate = await Usuario.findOneAndUpdate(
    //   { email: "jp@g.com" },
    //   { nombre: "Juanito" }
    // );
    // console.log(usuarioUpdate);

    // // /* -------------------------------------------------------*/
    // // /* ------------------------- DELETE ----------------------*/
    // // /* -------------------------------------------------------*/

    // console.log("DELETE");
    // const usuarioDelete = await Usuario.deleteOne({ email: "jp@g.com" });
    // console.log(usuarioDelete);

    mongoose.disconnect();
  } catch (error) {
    console.log(error);
  }
}
