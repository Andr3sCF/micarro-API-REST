/* Importing the router, the controller and the validator. */
import { Router } from "express";
import {methods as carController}  from "./../controllers/car.controller"
const { validateCreate } = require('../validators/carro')


/* A router that is used to route the request to the controller. */
const router = Router();
router.get("/findall", carController.getCars)
    .get("/find/:id", carController.getCarroParametros)
    .post("/add", validateCreate, carController.addCarro)
    .delete("/delete/:id", carController.deleteCarro)
    .put("/update/:id", carController.updateCarro)
    .get("/placa/:id", carController.picoPlaca)
    .get("/devaluacion/:Persona_idPersona", carController.devaluacion)



export default router;