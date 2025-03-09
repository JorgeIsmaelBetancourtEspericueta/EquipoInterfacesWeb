//Al iniciar el proyecto hicimos las siguientes instalaciones
//  npm init -y (Para iniciar los modulos de node)
//  npm i express (Para instalar express)
//Para poder correr el proyecto debemos de poner "node src/index.js" (mas adelante esto cambia)
//Agregamos esto en el archivo de package.json ""type": "module"", para poder utilizar los modulos de express
//Instalamos nodemon para que se este actualizando sin decesidad de volver a ejecutar (npm i nodemon -D)
//Agregamos lo siguiente ("dev": "nodemon src/index.js") en el archivo de package.json para poder correr el proyecto con "npm run dev"
//Instalamos el modulo de morgan "npm i morgan", que nos sirve para ver las peticiones que nos llegan al back
//Morgan nos da unos pequeños mensajes de que es lo que esta pasando con nuestro servidor, pro ejemplo: "GET / 404 2.884 ms - 139"
//Para poder conectarno a mongodb y modelar los datos, instalamos mongoose "npm i mongoose"
//Instalamos un modulo de node "npm i bcrypt js" el cual nos sirve para poder hashear la contraseña y que se guarde encriptada en la bd
//Para poder crear un token para verificar el inicio de sesión, instalamos el modulo "npm i jsonwebtoken"
//Instalamos "npm i cookie-parser" para las cookies poderlas convertir en un objeto JSON
//Instalamos el modulo zod "npm i zod" este es una modulo el cual ya cuenta con muchas validaciones y nos ayudara a validar los datos enviados al back
//Instalamos cors "npm i cors" el cual nos sirve para solucionar el problema entre los diferentes puertos que tienen el back y el front, ya que el front tiene el 5173 y el back el 3000
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express(); //Este es el servidor

//app.use(cors()); //Esto es como decirle que todos los dominios se puedan comunicar. Se puede dejar solo asi o ser mas especifico de la siguiente manera:
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json()); //Esto es para que pueda convertir los req.body en  objetos JSON
app.use(cookieParser());

app.use("/api", authRoutes); // Esto para poder traer las rutas definidas en el archivo "auth.routes.js"
//Ponemos "/api" antes de cada ruta para que no se llame igual que en el frontend las rutas

export default app;
