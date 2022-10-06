import express from "express";
import morgan  from "morgan";
import personasRoutes from "./routes/personas.routes";
import carRoutes from "./routes/car.routes";




const app = express();

 app.set("port", 4000);

 //middlelwares
 app.use(morgan("dev"));
 app.use(express.json());

/* Importing the routes from the routes folder. */
 app.use("/api/personas", personasRoutes)
 app.use("/api/carros", carRoutes)


 
export default app

