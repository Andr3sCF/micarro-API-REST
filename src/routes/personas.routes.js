import { Router } from "express";
import {methods as personasController}  from "./../controllers/personas.controller";

const router = Router();
//se nombran las rutas que se deseen manejar por la api.
router.post("/add", personasController.addPersonas)
    .get("/findall", personasController.getPersonas)
//se envia el parametro en la url de prueba: /api/find/1,2,3,n....
    .get("/find/:numeroDocumento", personasController.getPersonaParametros)
    .delete("/delete/:id", personasController.deletePersonas)
    .put("/update/:id", personasController.updatePersonas)
    .put("/disable/:id", personasController.disablePersonas);



export default router;