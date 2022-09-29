import { getConnection } from "../database/database"

const getCars = async (req, res) => {

    try{
        const connection = await getConnection();
        const result = await connection.query(" SELECT * FROM carro");
        res.json(result);
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};

const getCarroParametros = async (req, res) => {
    try{
        //se obtiene el parametro enviado por la api
        const{ id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(" SELECT * FROM carro WHERE  Persona_idPersona = ?", id);
        res.json(result);
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};

const addCarro = async (req, res) => {
    try{
        // se crean las constantes que van a venir con la info desde el formulario(json).
        const {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, valorActual, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro} = req.body;
        //validacion desde el backend para campos vacios
        if (placa === undefined || marca === undefined){
            res.status(400).json({message:"placa o modelo vacios, llene los campos"})
        }
        
        const carro = {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, valorActual, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro};
        const connection = await getConnection()
        const query = "select count(*) as total from micarro.carro where Persona_idPersona = ?"
        const params = [Persona_idPersona];
        const doQuery = (query, params) => {
            return new Promise((resolve, reject) => {
                connection.query(query, params, (error, rows, fields) => {
                if(error) {
                  return reject(error);
                }
                return resolve([rows, fields]);
              });
            });
        };
        const [rows, fields] = await doQuery(query, params);
        if (rows[0].total >= 3 ){
            res.status(400).json({message:"Solo puedes tener tres vehiculos"})
        }else{
            await connection.query("INSERT INTO carro SET ?", carro)
            res.json({ message: "Se agrego vehiculo"})
        }

    }catch(error){
        res.status(500)
            .send(error.message)
    }
    
};

const deleteCarro = async (req, res) => {
    try{        
        //se obtiene el parametro enviado por la api
        const{ id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM carro WHERE (idCarro = ?)", id);
        res.json(result);
    }catch(error){
        res.status(500)
        .send(error.message)
    }
};

const updateCarro = async (req, res) => {
    try{
        const{ id } = req.params;
        const {idCarro, color, kilometraje, valorNuevo} = req.body;
        if (color === undefined || kilometraje === undefined || valorNuevo === undefined){
            res.status(400).json({message:"campos vacios, llene todos los campos"})
        }
        const personas = {idCarro, color, kilometraje, valorNuevo};
        const connection = await getConnection();
        await connection.query(" UPDATE carro SET ? WHERE idCarro = ?", [personas, id]);  
        res.json({ message: "se edito el carro" });
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};

export const methods = {
    getCars,
    getCarroParametros,
    addCarro,
    deleteCarro,
    updateCarro
};