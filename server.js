import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

// Configurar body-parser para analizar las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://localhost:27017/anime", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log("Conectado a la base de datos MongoDB");
});

// Definir el esquema de la ruta, el middleware, el controlador y el servicio
const router = express.Router();
const middleware = (req, res, next) => {
  // Agregar lógica de permisos de usuario aquí
  next();
};
const controller = (req, res) => {
  // Agregar lógica para ejecutar servicios aquí
};
const service = {
  findUserByID: () => {
    // Agregar lógica para buscar usuario por ID aquí
  },
  fetchAnimes: () => {
    // Agregar lógica para obtener animes aquí
  },
  fetchAnimesPaginated: () => {
    // Agregar lógica para obtener animes paginados aquí
  },
};

// Definir rutas
router.get("/user/:id", middleware, controller(service.findUserByID));
router.get("/animes", middleware, controller(service.fetchAnimes));
router.get("/animes/:page", middleware, controller(service.fetchAnimesPaginated));

// Agregar rutas al servidor
app.use("/api", router);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor API REST en ejecución en el puerto 3000");
});
