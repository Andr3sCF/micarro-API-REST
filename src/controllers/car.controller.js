import { json } from "express";
import { getConnection } from "../database/database"
import {methods as service}  from "./../services/carros.service"

const getCars = async (req, res) => {
    try{
        const [result] = await service.selectAll()
        res.json(result)   
    }catch(error){
        res.status(500)
            .send(error.message)
    }
}

const getCarroParametros = async (req, res) => {
    try{
        const{ id } = req.params
        const [result] = await service.selectBy(id)
        res.json(result)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
}

const picoPlaca = async (req, res) => {
    try{
        var date = new Date()
        var dia = date.getDay()
        if(dia > 0 && dia < 6){
            const{ id } = req.params
            const result = await service.carrosPicoPlaca(id)
            res.json(result)
        }else{
            res.json({message:"los fines de semana no hay pico y placa"})
        }

    }catch(error){
        res.status(500)
            .send(error.message)
    }
}

const devaluacion = async (req, res) => {
    try{
        const{ id } = req.params
        const result = await service.devaluacion(id)
        console.log(result)
        res.json(result)
    }catch(error){
        res.status(500)
            .send(error.message)
    }
}

const addCarro = async (req, res) => {
    try{
        const {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, fechaCambioAceite, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro} = req.body
        const carro = {idCarro, placa, marca, modelo, color, kilometraje, valorNuevo, fechaCambioAceite, fechaTecno, fechaSoat, Persona_idPersona, TipoCarro_idTipoCarro}
        const [result] = await service.add(Persona_idPersona, carro)
        res.json(result)

    }catch(error){
        res.status(500)
            .send(error.message)
    }
    
}

const deleteCarro = async (req, res) => {
    try{   
        const{ id } = req.params
        await service.del(id)
        res.json({ message: "se elimino el carro" })
    }catch(error){
        res.status(500)
        .send(error.message)
    }
}

const fechaTecno =  async (req, res) =>{

    try{
        const{id} = req.params
        const result = await service.fechaT(id)
        res.json(result)
    }catch(error){
        res.status(500)
        .send(error.message)

    }


}
const fechaSoat =  async (req, res) =>{

    try{
        const{id} = req.params
        const result = await service.fechaS(id)
        res.json(result)
    }catch(error){
        res.status(500)
        .send(error.message)

    }


}

const updateCarro = async (req, res) => {
    try{
        const{ id } = req.params;
        const {idCarro, color, kilometraje, fechaCambioAceite} = req.body
        const personas = {idCarro, color, kilometraje, fechaCambioAceite}
        await connection.query(" UPDATE carro SET ? WHERE idCarro = ?", [personas, id]) 
        res.json({ message: "se edito el carro" })
    }catch(error){
        res.status(500)
            .send(error.message)
    }
}


export const methods = {
    getCars,
    getCarroParametros,
    addCarro,
    deleteCarro,
    updateCarro,
    picoPlaca,
    devaluacion,
    fechaTecno,
    fechaSoat
};