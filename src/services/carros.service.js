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
            });
        });
    };
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
        const query = " SELECT placa FROM carro WHERE  Persona_idPersona = ?"
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

export const methods = {
    selectAll,
    selectBy,
    carrosPicoPlaca,
};