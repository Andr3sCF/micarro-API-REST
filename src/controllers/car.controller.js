import { json } from "express";
import { getConnection } from "../database/database"
import {methods as service}  from "./../services/carros.service"

/**
 * It creates a connection to the database, then it queries the database for all the cars, and then it
 * sends the result to the client.
 * @param req - The request object.
 * @param res - The response object.
 */
const getCars = async (req, res) => {
    try{
        const [result] = await service.selectAll()
        res.json(result)   
    }catch(error){
        res.status(500)
            .send(error.message)
    }

};
/**
 * It's a function that takes in a request and a response, and then it tries to get the id from the
 * request parameters, and then it tries to get a connection to the database, and then it tries to
 * query the database for the carro with the id that was passed in, and then it tries to send the
 * result of the query back to the client.
 * 
 * If any of those things fail, it sends an error message back to the client.
 * @param req - request
 * @param res - response
 */
const getCarroParametros = async (req, res) => {
    try{
        const{ id } = req.params
        const [result] = await service.selectBy(id)
        res.json(result)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
/**
 * It takes a user id, finds all the cars that belong to that user, and then checks if any of those
 * cars have resctriction on the current day.
 * @param req - The request object.
 * @param res - The response object.
 */
const picoPlaca = async (req, res) => {
    try{
        var date = new Date()
        var dia = date.getDay()
        if(dia > 0 && dia < 6){
            const{ id } = req.params
            const result = await service.carrosPicoPlaca(id)
            console.log(result)
            res.json(result)
        }else{
            res.json({message:"los fines de semana no hay pico y placa"})
        }

    }catch(error){
        res.status(500)
            .send(error.message)
    }
};


/**
 * It takes the data from the database and calculates the depreciation of the car based on the brand,
 * model, value and mileage.
 * @param req - The request object.
 * @param res - the response object
 */
const devaluacion = async (req, res) => {
    try{
        function calcularDep(valor, modelo, porcentaje1, porcentaje2, km){
            var date = new Date()
            const year = date.getFullYear()+1
            // 2023-2012 11 
            const antiguedad = year - modelo
            const depPrimerAnio = valor*porcentaje1
            const depConst =  (depPrimerAnio*porcentaje2)*(antiguedad-1)
            let depKm = 0
            let valorActual = 0
            if (km <= 50000){
                depKm = 400000
            }else if(km > 50000 && km <= 100000){
                depKm = 700000
            }else if(km > 100000 &&  km <= 150000){
                depKm = 1000000
            }else if(km > 150000 &&  km <= 250000){
                depKm = 1500000
            }else if(km > 250000 &&  km <= 300000){
                depKm = 2500000
            }else if(km > 300000){
                depKm = 5000000
            }
            if(antiguedad > 1){
                valorActual = valor - depPrimerAnio - depConst - depKm
                return valorActual
            }else{
                valorActual = valor - depPrimerAnio -depKm
                return valorActual
            }
        }
        const{ Persona_idPersona } = req.params
        const connection = await getConnection()
        const params = [Persona_idPersona]
        const query = " SELECT placa, valorNuevo, marca, modelo, kilometraje FROM carro WHERE  Persona_idPersona = ?"
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
        var carros =  []
        var j = 0
        rows.forEach(i => {
            const placa = i.placa
            const valor = i.valorNuevo
            const modelo = i.modelo
            const km = i.kilometraje
            const marca = i.marca.split(` `)[0]
            let valActual = ""
            switch(marca){
                case `Kia`:
                    valActual = calcularDep(valor, modelo, 0.23, 0.129, km)
                    break
                case `Renault`:
                    valActual = calcularDep(valor, modelo, 0.16, 0.10, km)
                    break
                case `Nissan`:
                    valActual = calcularDep(valor, modelo, 0.20, 0.10, km)
                    break
                case `Hyundai`:
                    valActual = calcularDep(valor, modelo, 0.1, 0.10, km)
                    break
                case `Chevrolet`:
                    valActual = calcularDep(valor, modelo, 0.16, 0.10, km)
                    break
                case `Mazda`:
                   valActual = calcularDep(valor, modelo, 0.16, 0.10, km)
                    break
                case `Volkswagen`:
                    valActual = calcularDep(valor, modelo, 0.16, 0.10, km)
                    break
                case `Toyota`:
                    valActual = calcularDep(valor, modelo, 0.16, 0.10, km)
                    break
                default:
                    valActual = "no parece una marca valida para nuestro sistema de depreciacion"    
            }
            var msg = "El valor actual aproximado de tu vehiculo " + placa + ' es ' + valActual
            carros[j]=msg
            j++
            })
            res.json(carros)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
};
/**
 * It's a function that adds a car to the database, but only if the user has less than 3 cars already.
 * @param req - The request object.
 * @param res - The response object.
 */
const addCarro = async (req, res) => {
    try{
        const {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, fechaCambioAceite, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro} = req.body;
        const carro = {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, fechaCambioAceite, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro};
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

/**
 * It deletes a car from the database.
 * @param req - The request object. This contains information about the HTTP request that raised the
 * event.
 * @param res - The response object.
 */
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

/**
 * It takes the id of the car from the url, and the rest of the data from the body of the request, and
 * updates the car with the given id with the new data.
 * @param req - The request object.
 * @param res - The response object.
 */
const updateCarro = async (req, res) => {
    try{
        const{ id } = req.params;
        const {idCarro, color, kilometraje, fechaCambioAceite} = req.body
        const personas = {idCarro, color, kilometraje, fechaCambioAceite}
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