const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class userController{

    addUser = async(req, res) => {
        try{
            const user = await User.create(req.body)
            res.status(200).json(user)
        } catch(e) {
            console.log(e.message)
            res.status(500).json({message: e.message})
        }
    };

    getAllUsers = async (req, res, next) => {
        try {
            const users = await User.find({});
            res.status(200).json(users);
        } catch(e) {
            res.status(500).json({message: e.message})
        }
    };

    userSignin = async (req, res) => {
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user) return res.json({success: false, message: "user not found"})

        const isMatch = await user.comparePassword(password)
        if(!isMatch) return res.json({success: false, message: "pass no match"});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})

        res.json({success: true, user, token})
    }
}

module.exports = new userController;