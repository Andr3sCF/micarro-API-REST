import { getConnection } from "../database/database"

const getCars = async (req, res) => {

    try{
        const connection = await getConnection()
        const result = await connection.query(" SELECT * FROM carro")
        res.json(result)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};

const getCarroParametros = async (req, res) => {
    try{
        const{ id } = req.params;
        const connection = await getConnection()
        const result = await connection.query(" SELECT * FROM carro WHERE  Persona_idPersona = ?", id)
        res.json(result);
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
const picoPlaca = async (req, res) => {
    try{

        var date = new Date()
        var dia = date.getDay()
        if(dia > 0 && dia < 6){
            const{ Persona_idPersona } = req.params
            const connection = await getConnection()
            const params = [Persona_idPersona]
            const query = " SELECT placa FROM carro WHERE  Persona_idPersona = ?"
            const doQuery = (query, params) => {
                return new Promise((resolve, reject) => {
                    connection.query(query, params, (error, rows, fields) => {
                    if(error) {
                      return reject(error)
                    }
                    return resolve([rows, fields])
                  });
                });
            };
            const [rows, fields] = await doQuery(query, params)
            var fecha =  date.toISOString().split('T')[0].substr(-1)
            var placaas =  []
            var j = 0
            rows.forEach(i => {
                const placa = i.placa

                if ((placa.substr(-1)%2 == 0 && fecha%2 == 0) || (placa.substr(-1)%2 != 0 && fecha%2 != 0)){
                    var alerta = "Tienes pico y placa en tu carro "
                    var msg = alerta + placa
                    placaas[j] = msg
                j ++
                }else{
                    var alerta = "no Tienes pico y placa en tu carro "
                    var msg = alerta + placa
                    placaas[j] = msg
                    j ++
                }    
            })
            res.json(placaas)
        }else{

            res.json({message:"los fines de semana no hay pico y placa"})

        }

    }catch(error){
        res.status(500)
            .send(error.message)
    }
};


const devaluacion = async (req, res) => {
    try{

        var date = new Date()
        var year = date.getFullYear()
        console.log(year)

        const{ Persona_idPersona } = req.params
            const connection = await getConnection()
            const params = [Persona_idPersona]
            const query = " SELECT placa, FROM carro WHERE  Persona_idPersona = ?"
            const doQuery = (query, params) => {
                return new Promise((resolve, reject) => {
                    connection.query(query, params, (error, rows, fields) => {
                    if(error) {
                      return reject(error)
                    }
                    return resolve([rows, fields])
                  });
                });
            };
            const [rows, fields] = await doQuery(query, params)
        
            res.json(doQuery)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
const addCarro = async (req, res) => {
    try{
        const {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, valorActual, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro} = req.body;
        const carro = {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, valorActual, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro};
        const connection = await getConnection()
        const query = "select count(*) as total from micarro.carro where Persona_idPersona = ?"
        const params = [Persona_idPersona]
        const doQuery = (query, params) => {
            return new Promise((resolve, reject) => {
                connection.query(query, params, (error, rows, fields) => {
                if(error) {
                  return reject(error)
                }
                return resolve([rows, fields])
              });
            });
        };
        const [rows, fields] = await doQuery(query, params)
        if (rows[0].total >= 3 ){
            res.json({message:"Solo puedes tener tres vehiculos"})
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
        const{ id } = req.params;
        const connection = await getConnection()
        const result = await connection.query("DELETE FROM carro WHERE (idCarro = ?)", id)
        res.json(result)
    }catch(error){
        res.status(500)
        .send(error.message)
    }
};

const updateCarro = async (req, res) => {
    try{
        const{ id } = req.params;
        const {idCarro, color, kilometraje, valorNuevo} = req.body
        const personas = {idCarro, color, kilometraje, valorNuevo}
        const connection = await getConnection()
        await connection.query(" UPDATE carro SET ? WHERE idCarro = ?", [personas, id]) 
        res.json({ message: "se edito el carro" })
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
    updateCarro,
    picoPlaca,
    devaluacion
};