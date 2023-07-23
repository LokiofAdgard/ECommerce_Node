const { check, validationResult } = require('express-validator');

class userValidation{
    validateUserSignup = [
        check('name').trim().not().isEmpty().withMessage("Name put"),
        check('email').normalizeEmail().isEmail().withMessage("invalid email"),
        check('password').trim().not().isEmpty().withMessage("pass invalid")
    ]
    
    isUserValid = (req, res, next) => {
        const result = validationResult(req).array()
        if(!result.length) return next();
    
        const error = result[0].msg;
        res.json({success: false, message: error})
    };
    
    validateUserSignIn = [
        check('email').trim().isEmail().withMessage('email required'),
        check('password').trim().not().isEmpty().withMessage('pass requied')
    ]
}

module.exports = new userValidation;
