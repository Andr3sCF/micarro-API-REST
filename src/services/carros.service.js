import { getConnection } from "../database/database"

const ejecutarBD = async(sql, params1) =>{
    const connection = await getConnection()
    const doQuery = (query, params) => {
        query = sql
        params = params1
        return new Promise((resolve, reject) => {
            connection.query(query, params, (error, rows) => {
                if(error) {
                    return reject(error)
                }
                return resolve([rows])
            })
        })
    }
    return doQuery()
}

const selectAll = async() =>{
    const query = "SELECT * FROM carro"
    return ejecutarBD(query)
};

const selectBy = async (id) => {
    const query = "SELECT * FROM carro WHERE  Persona_idPersona = ?"
    return ejecutarBD(query, id)
};

const carrosPicoPlaca = async (id) => {
    const listadoPlacas = async (params) => {    
        const query = "SELECT placa FROM carro WHERE  Persona_idPersona = ?"
        var date = new Date()
        params = id
        const [rows, fields] = await ejecutarBD(query, params)
        var fecha =  date.toISOString().split('T')[0].substr(-1)
        var placaas =  []
        var j = 0
        rows.forEach(i => {
            const placa = i.placa
            if ((placa.substr(-1)%2 == 0 && fecha%2 == 0) || (placa.substr(-1)%2 != 0 && fecha%2 != 0)){
                var msg = "Tienes pico y placa en tu carro " + placa
                placaas[j] = msg
                j ++
            }else{
                var msg = "no Tienes pico y placa en tu carro " + placa
                placaas[j] = msg
                j ++
            } 
        })
        return placaas
    }
    return listadoPlacas()
};
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
const devaluacion = async (id) => {

    const listadoDeva = async (params) => {    

        const query = "SELECT placa, valorNuevo, marca, modelo, kilometraje FROM carro WHERE  Persona_idPersona = ?"
        params = id

        const [rows, fields] = await ejecutarBD(query, params)
        var carros =  []
        var j = 0
        console.log(params)
        rows.forEach(i => {
            const placa = i.placa
            const valor = i.valorNuevo
            const modelo = i.modelo
            const km = i.kilometraje
            const marca = i.marca.split(` `)[0]
            let valActual = calcularDep()
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
        return carros
    }
    return listadoDeva()

}


const add = async (id, carro) => {

    const msgAgregado = async () => {    
        const query = "select count(*) as total from micarro.carro where Persona_idPersona = ?"
        
        const [rows, fields] = await ejecutarBD(query, id)
        var carros =  []
        var cant = rows[0].total
        if (cant == 3 ){
            var msg = "Solo puedes tener tres vehiculos"
            carros [0] = msg
            return carros
        }else if (cant == 0){   
            const query = "INSERT INTO carro SET ?"     
            await ejecutarBD(query, carro)
            var msg = "Se agrego tu primer vehiculo"
            carros [0] = msg
            return carros
        }else if(cant > 0 && cant < 3){

            const query = "INSERT INTO carro SET ?"     
            await ejecutarBD(query, carro)
            var newCant = cant + 1
            var msg = "Se agrego tu vehiculo numero " + newCant
            carros [0] = msg
            return carros

        }
        return carros
    }

    return msgAgregado()
};

const del = async (id) => {
    const query = "DELETE FROM carro WHERE (idCarro = ?)"
    return ejecutarBD(query, id)
};




export const methods = {
    selectAll,
    selectBy,
    carrosPicoPlaca,
    devaluacion,
    add,
    del,

};