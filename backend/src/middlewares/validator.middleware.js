//Aqui mandamos llamar las funciones del archivo "auth.schmea.js"

export const validateSchema = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next();
    }catch(error){
        return res.status(400).json({error: error.errors.map(error => error.message)});//En esta parte lo que estamos hacindo es recorrer el arreglo de error y decirle que solo me muestre el mensaje, ya que muestra mas cosas que no nos interesan
    }
};