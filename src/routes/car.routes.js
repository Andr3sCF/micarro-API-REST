import { Router } from "express"
import {methods as carController}  from "./../controllers/car.controller"
const { validateCreate } = require('../validators/carro')

const router = Router();
router.get("/findall", carController.getCars)
    .get("/find/:id", carController.getCarroParametros)
    .post("/add", validateCreate, carController.addCarro)
    .delete("/delete/:id", carController.deleteCarro)
    .put("/update/:id", carController.updateCarro)
    .get("/placa/:id", carController.picoPlaca)
    .get("/devaluacion/:id", carController.devaluacion)
    .get("/soat/:id", carController.fechaSoat)
    .get("/tecno/:id", carController.fechaTecno)


// validator fecha de soat y tecno mecanica


export default router;