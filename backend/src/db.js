import mongoose from 'mongoose';

//Esta conexion es la que hacemos con nuestra base de datos la cual se llamara "foodie" y se creara cuando se inserte el primer dato
export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/foodie');
        console.log(">>> Base de datos conectada");
    }catch (error){
        console.log(error);
    }
};