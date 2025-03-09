import app from "./app.js";
import { connectDB } from "./db.js";

connectDB(); //Aqui estamos haciendo ya la conexión a mongo
app.listen(3000);
console.log("Server en puerto", 3000);
