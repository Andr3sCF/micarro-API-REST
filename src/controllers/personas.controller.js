import { getConnection } from "../database/database"

//agregar personas
const addPersonas = async (req, res) => {
    try{
        const {idPersona, numeroDocumento, nombre, apellido, fechaNacimiento, correo, direccion, telefono, foto, TipoDoc_idTipoDoc, Estado_idEstado} = req.body;
        const personas = {idPersona, numeroDocumento, nombre, apellido, fechaNacimiento, correo, direccion, telefono, foto, TipoDoc_idTipoDoc, Estado_idEstado};
        const connection = await getConnection();
        await connection.query("INSERT INTO persona SET ?", personas);
        var Persona_idPersona = idPersona;
        //111 es el rol cliente
        var  Rol_idRol = 111 ;
        //se crea un arreglo con los dos datos que se van a pasar a DB
        const permiso = {Persona_idPersona, Rol_idRol};
        await connection.query("INSERT INTO persona_has_rol SET ?", permiso);
        res.json({ message: "persona agregada como cliente" });
    }catch(error){
        res.status(500)
            .send(error.message)
    }
    
};
//modificar  persona
const updatePersonas = async (req, res) => {
    try{
        const{ id } = req.params;
        const {idPersona, correo, direccion, telefono, foto} = req.body;
        const personas = {idPersona, correo, direccion, telefono, foto};
        const connection = await getConnection();
        await connection.query(" UPDATE persona SET ? WHERE idPersona = ?", [personas, id]);  
        res.json({ message: "se edito la persona" });
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
const disablePersonas = async (req, res) => {
    try{

        const{ id } = req.params;
        const{Estado_idEstado } = req.body;
        const connection = await getConnection();
        await connection.query(" UPDATE persona SET Estado_idEstado = ? WHERE idPersona = ?",  [Estado_idEstado, id]);
        if  (Estado_idEstado === 1){ 
            res.json({ message: "se habilito la persona" });
        }
        if (Estado_idEstado === 2) {
            res.json({ message: "se inhabilito la persona" });
        }

    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
//buscar en bd
const getPersonas = async (req, res) => {

    try{
        const connection = await getConnection();
        const result = await connection.query(" SELECT * FROM persona");
        res.json(result);
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
//buscar en bd por parametros
const getPersonaParametros = async (req, res) => {
    try{
        const{ numeroDocumento } = req.params;
        const connection = await getConnection();
        const result = await connection.query(" SELECT * FROM persona WHERE  numeroDocumento = ?", numeroDocumento);
        res.json(result);
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
//eliminar una persona
const deletePersonas = async (req, res) => {
    try{        
        const{ id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM persona WHERE (idPersona = ?)", id);
        res.json(result);
    }catch(error){
        res.status(500)
        .send(error.message)
    }
};

export const methods = {
    getPersonas,
    addPersonas,
    getPersonaParametros,
    deletePersonas,
    updatePersonas,
    disablePersonas
};