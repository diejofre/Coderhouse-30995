import mongoose from "mongoose";

const usuariosCollection = "usuarios";

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
});

export const Usuario = mongoose.model(usuariosCollection, usuarioSchema);
