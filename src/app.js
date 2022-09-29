import express from "express";
import morgan  from "morgan";
//rutas
import personasRoutes from "./routes/personas.routes";
import permisosRoutes from "./routes/permisos.routes";
import carRoutes from "./routes/car.routes";




const app = express();
 //conf

 app.set("port", 4000);

 //middlelwares

 app.use(morgan("dev"));
 app.use(express.json());

 //rutas
 app.use("/api/personas", personasRoutes);
 app.use("/api/permisos", permisosRoutes);
 app.use("/api/carros", carRoutes);


 
export default app;

