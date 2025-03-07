import { Router } from "express";//Importamos express para usar su enrutador
import {register, login, logout, profile} from "../controllers/auth.controllers.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";//Importamos la funcion que evalueara el eschema
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);//A validateSchema le pasamos de parametro el schema que creamos en el archivo auth.schema.js
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);

export default router;