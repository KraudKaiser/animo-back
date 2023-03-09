import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import animesRouter from "./src/controllers/animes"
import usersRouter from "./src/controllers/users"

const app = express();

// Configurar body-parser para analizar las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/anime", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Conectado a la base de datos MongoDB");
});



// Definir rutas
app.get("/anime", animesRouter)
// Agregar rutas al servidor
app.use("/user", usersRouter);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor API REST en ejecución en el puerto 3000");
});
