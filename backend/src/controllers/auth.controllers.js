import User from '../models/user.model.js';//Estamos exportando el modelo "Tabla" en donde se guadaran los usuarios
import bcrypt from 'bcryptjs'; // esto nos va a servir para poder encriptar la contraseña
import jwt from 'jsonwebtoken';//Con esto crearemos el token una vez que un usuario se haya logueado
import {createAccessToken} from '../libs/jwt.js'

export const register = async (req, res) => {
    const {username, email, password} = req.body;
    
    try{

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash, //Le pasamos el valor del hash
        });
    
        const userSaved = await newUser.save();//Con esto ya se esta guardando el usuario en la base de datos
        
        const token = await createAccessToken({id: userSaved._id});

        res.cookie('token', token);
        //res.json({ message : "Usuario creado satisfactoriamente"});
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        });//Creamos esa nueva variable para que me devuelva al usuario con su fecha de creacion y edicion, ya que si hubieramos puesta ahi la variable newUser, solo devolveria los datos ingresados
    }catch(error){
        res.status(500).json({messgae: error.message});
    }

};

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    try{

        //Buscar el usurio que quiere loguearse a ver si existe
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});

        //La funcion compare() devuelve un true o false, entonces comparamos las contraseñas a ver si coinciden
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"})

        const token = await createAccessToken({id: userFound._id});

        res.cookie('token', token);
        //res.json({ message : "Usuario creado satisfactoriamente"});
        
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });//Creamos esa nueva variable para que me devuelva al usuario con su fecha de creacion y edicion, ya que si hubieramos puesta ahi la variable newUser, solo devolveria los datos ingresados
    }catch(error){
        res.status(500).json({messgae: error.message});
    }

};

export const logout = (req, res) => {
    //Aqui lo quie estamos haciendo es que vuelve nulo el token, y para poder loguearte se necesita token, por ende es como si se cerrara la sesión
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: "Usuario no encontrado"});
    
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    });

}