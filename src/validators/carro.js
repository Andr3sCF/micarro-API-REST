const {check} = require(`express-validator`)
const { validateResult } = require('../helpers/validate.helper')
/* The above code is validating the input of the user. */
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
            if (value < 2012) {
                throw new Error('el modelo del vehiculo debe ser del 2012 en adelante')
            }
            if(value > year){
                throw new Error('el modelo es mayor al ultimo año de produccion')
            }
            return true
        }),
    check(`kilometraje`)
        .exists()
        .custom((value, { req }) => {
            if (value < 0) {
                throw new Error('debe ser 0 Km o mayor')
            }else if (value > 550000){
                throw new Error('cambie ese pedazo de tiesto')
            }
            return true
        }),
    (req, res, next ) => {
        validateResult(req, res, next)
    }
    
]
module.exports = {validateCreate }