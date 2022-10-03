const {check} = require(`express-validator`)
const { validateResult } = require('../helpers/validate.helper')
const validateCreate  = [

    check(`placa`)
        .exists()
        .custom((value, { req }) => {
            var patronPlaca = /^[a-z]{3,3}[0-9]{3}$/
            if (patronPlaca.test(value) == false) {
                throw new Error('No es una placa valida')
            }
            return true
        }),
    check(`modelo`)
        .exists()
        .custom((value, { req }) => {
            var date = new Date()
            var year = date.getFullYear()+1
            console.log(year)
            if (value < 2008) {
                throw new Error('el modelo del vehiculo debe ser del 2008 en adelante')
            }
            if(value > year){
                throw new Error('el modelo es mayor al ultimo año de produccion')
            }
            return true
        }),
    (req, res, next ) => {
        validateResult(req, res, next)
    }
    
]
module.exports = {validateCreate }