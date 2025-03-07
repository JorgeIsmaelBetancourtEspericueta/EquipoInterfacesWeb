//en este archivo estamos creando el token en el momento en el que se registra un usuario
import jwt from 'jsonwebtoken';
import {TOKEN_SECRET} from '../config.js';

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if(err) reject(err);
                resolve(token);
            }
        );
    })
}
