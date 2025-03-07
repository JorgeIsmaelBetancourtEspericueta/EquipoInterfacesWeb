//Este archivo nos servira para hacer las validaciones de los datos enviados al back
import {z} from 'zod';

//Creamos un objeto, ya que los datos recibidos por el req.body son un objeto
export const registerSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es requerido'
    }),

    email: z.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El email es invalido'
    }),
    
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contrasela debe ser de al menos 6 caracteres'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El email es requerido para iniciar sesión'
    }).email({
        message: 'El email es invalido'
    }),

    password: z.string({
        required_error: 'La contraseña es requerida para iniciar sesión'
    }).min({
        message: 'La contraseña debe ser de almenos 6 caracteres'
    })
});