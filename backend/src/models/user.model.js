//En este archivo vamos a crear el mnodelo de datos para los usuarios.

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true //Esto es para quitar los espacios en el username
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true //Esto es para que no haya emails repetidos
    },
    password: {
        type : String,
        required: true,
    }
},{
    timestamps: true//Esto es para que se guarde la fecha en que se crea y modifica un usuario
});

export default mongoose.model("User", userSchema);//User sera el nombre de la "Tabla" en mongo llamada modelo, en donde se guardaran los datos del usuario