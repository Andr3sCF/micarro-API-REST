import { getConnection } from "../database/database"

//agregar personas
const addPersonas = async (req, res) => {
    try{
        // se crean las constantes que van a venir con la info desde el formulario(json).
        const {idPersona, numeroDocumento, nombre, apellido, fechaNacimiento, correo, direccion, telefono, foto, TipoDoc_idTipoDoc, Estado_idEstado} = req.body;
        //validacion desde el backend para campos vacios
        if (numeroDocumento === undefined || nombre === undefined){
            res.status(400).json({message:"nombre o documento vacios, llene los campos"})
        }
        const personas = {idPersona, numeroDocumento, nombre, apellido, fechaNacimiento, correo, direccion, telefono, foto, TipoDoc_idTipoDoc, Estado_idEstado};
        const connection = await getConnection();
        await connection.query("INSERT INTO persona SET ?", personas);
        /*DANDOLE EL ROL POR DEFECTO AL USURIO:
        asigna el valor a la llave foranea del id de la persona que se esta agregando al sistema*/
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
        //se obtiene el parametro enviado por la api
        const{ id } = req.params;
        // se crean las constantes que traen la info desde el formulario(json).
        const {idPersona, correo, direccion, telefono, foto} = req.body;
         //validacion desde el backend para campos vacios
        if (correo === undefined || direccion === undefined || telefono === undefined){
            res.status(400).json({message:"campos vacios, llene todos los campos"})
        }
        //se crea el arreglo que va a ir a bd y va a contener las constantes anteriormente creadas que se van a modificar.
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
        //se obtiene el parametro enviado por la api
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
        //se obtiene el parametro enviado por la api
        const{ id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM persona WHERE (idPersona = ?)", id);
        res.json(result);
    }catch(error){
        res.status(500)
        .send(error.message)
    }
};

//se exportan las funciones para poder verlas desde otros modulos
export const methods = {
    getPersonas,
    addPersonas,
    getPersonaParametros,
    deletePersonas,
    updatePersonas,
    disablePersonas
};