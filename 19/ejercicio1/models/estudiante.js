import mongoose from "mongoose";

const estudiantesCollection = "estudiantes";

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, max: 100 },
  apellido: { type: String, required: true, max: 100 },
  edad: { type: Number, required: true, max: 100 },
  dni: { type: String, required: true, max: 100, unique: true },
  curso: { type: String, required: true, max: 100 },
  nota: { type: Number, required: true, max: 100 },
});

export const Estudiante = mongoose.model(
  estudiantesCollection,
  estudianteSchema
);
