import { Router } from "express";
import {methods as carController}  from "./../controllers/car.controller";

const router = Router();
router.get("/findall", carController.getCars)
    .get("/find/:id", carController.getCarroParametros)
    .post("/add", carController.addCarro)
    .delete("/delete/:id", carController.deleteCarro)
    .put("/update/:id", carController.updateCarro)


export default router;