
import { getConnection } from "../database/database"

const getPermisos = async (req, res) => {

    try{
        const connection = await getConnection();
        const result= await connection.query(" select * from persona_has_rol");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message)
    }
};

const addPermiso = async (req, res) => {
    try{

        const {Persona_idPersona, Rol_idRol} = req.body;
        const permiso = {Persona_idPersona, Rol_idRol};
        const connection = await getConnection();
        const result= await connection.query("INSERT INTO persona_has_rol SET ?", permiso);
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message)
    }
};
const addPermisoprueba = async (req, res) => {
    try{

        const {_, Rol_idRol} = req.body;
        var  Persona_idPersona = 9 ;
        const permiso = {Persona_idPersona, Rol_idRol};
        const connection = await getConnection();
        console.log(permiso)
        const result= await connection.query("INSERT INTO persona_has_rol SET ?", permiso);
        console.log(permiso)
        res.json(result);

    }catch(error){
        res.status(500);
        res.send(error.message)
    }
};


export const methods = {
    addPermiso,
    getPermisos,
    addPermisoprueba,
};