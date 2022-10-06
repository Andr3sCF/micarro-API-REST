import { Router } from "express";
import { methods as permisosController } from "./../controllers/permisos.controller"

const router = Router();

router.get("/findall", permisosController.getPermisos)
    .post("/add", permisosController.addPermisoprueba)

export default router;