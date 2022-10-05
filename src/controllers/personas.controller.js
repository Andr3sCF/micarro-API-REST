import { getConnection } from "../database/database"

/**
 * It takes the data from the request body, creates an object with the data, and then inserts that
 * object into the database like a persona.
 * @param req - request
 * @param res - the response object
 */
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
/**
 * It takes the id of the person to be updated from the request parameters, and the rest of the data
 * from the request body, and then updates the person in the database with the new data.
 * @param req - request
 * @param res - the response object
 */
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
/**
 * It's a function that disables a person in the database.
 * @param req - request
 * @param res - the response object
 */
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
/**
 * It's an async function that gets a connection to the database, then queries the database for all the
 * rows in the persona table, then sends the result as a JSON object.
 * @param req - The request object. This object represents the HTTP request and has properties for the
 * request query string, parameters, body, HTTP headers, and so on.
 * @param res - The response object.
 */
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
/**
 * It deletes a row from the database table 'persona' where the idPersona column matches the id
 * parameter passed in the request.
 * @param req - The request object.
 * @param res - The response object.
 */
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