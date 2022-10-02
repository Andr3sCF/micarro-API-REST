const {check} = require(`express-validator`)
const { validateResult } = require('../helpers/validate.helper')

const validateCreate  = [

    check(`numeroDocumento`)
        .exists()
        .isNumeric(),
    check(`nombre`)
        .exists()
        .not()
        .isEmpty(),
    check(`apellido`)
        .exists()
        .not()
        .isEmpty(),
    check(`fechaNacimiento`)
        .exists()
        .isDate(),
    check(`correo`)
        .exists()
        .isEmail(),
    (req, res, next ) => {
        validateResult(req, res, next)
    }
    
]
module.exports = {validateCreate }