//Rutas protegidas
//En este archivo crearemos las funciones para validar las rutas
//Por si hay alguna ruta la cual se necesite estar logueado para acceder a ella
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Esta es una funcion middleware, el next nos sirve para continuar a la siguiente ruta
export const authRequired = (req, res, next) => {
    const {token} = req.cookies;
    
    if(!token) return res.status(401).json({message: "No hay token, autorización denegada."})

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(401).json({message: "Token invalido"});
        
        req.user = user;

        next();
    }); //la función verify es para verificar que si exista el token y sea valido
}