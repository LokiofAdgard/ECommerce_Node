const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.isAuth = async (req, res, next) => {
    if(req.headers && req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1]

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decode.userId);
            if(!user){
                return res.json({success:false, message:'unauthorized'})
            }
            req.user = user
            next()
        }catch(error){
            if(error.name == 'JsonWebTokenError'){
                return res.json({success:false, message:'unauthorized'})
            }
            if(error.name == 'TokenExpiredError'){
                return res.json({success:false, message:'session expired'})
            }
            return res.json({success:false, message:'server error'})
        }
        
    }else{
        res.json({success:false, message:'unauthorized'})
    }
}