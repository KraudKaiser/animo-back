const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const multer = require('multer');
const path = require("path")

const upload = multer({ dest: 'uploads/' });

require("dotenv/config")

const animesRouter = require("./src/controllers/animes")
const usersRouter = require("./src/controllers/users")
const categoryRouter = require("./src/controllers/category")

const app = express();

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar body-parser para analizar las solicitudes POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("Connection to database succesful")
})


// Definir rutas
app.use("/anime", animesRouter)
// Agregar rutas al servidor
app.use("/user", usersRouter);

app.use("/category", categoryRouter);

// Iniciar el servidor
app.listen(8081, () => {
  console.log("Servidor API REST en ejecución en el puerto 8081");
});

module.exports = {upload}