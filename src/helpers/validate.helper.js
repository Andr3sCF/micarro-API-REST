const { validationResult } = require(`express-validator`)

/**
 * It takes the request object, validates it, and if it's valid, it calls the next function in the
 * chain. If it's not valid, it sends a 403 error and the validation errors.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The validationResult function is being called on the request object. The throw() method is
 * being called on the result of the validationResult function.
 */
const validateResult = (req, res, next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch  (error){
        res.status(403)
        res.send({errors: error.array()})
    }
}
module.exports = { validateResult }