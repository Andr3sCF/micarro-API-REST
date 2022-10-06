import { Router } from "express"
import {methods as personasController}  from "./../controllers/personas.controller"
const { validateCreate } = require('../validators/personas')

const router = Router();
router.post("/add", validateCreate, personasController.addPersonas)
    .get("/findall", personasController.getPersonas)
    .get("/find/:numeroDocumento", personasController.getPersonaParametros)
    .delete("/delete/:id", personasController.deletePersonas)
    .put("/update/:id", personasController.updatePersonas)
    .put("/disable/:id", personasController.disablePersonas)



export default router