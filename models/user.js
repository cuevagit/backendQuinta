import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  nombre: String,
  apellido: String,
  foto: String,
  tipo_usuario: String,
});

export const User = mongoose.model("User", userSchema);
