const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
// const {validateUserSignup, userValidation} = require('../middleware/validation/userValidation');
const userValidation = require('../middleware/validation/userValidation');
const { isAuth } = require('../middleware/auth');

router.get('/getUsers', userController.getAllUsers)
router.post('/createuser', userValidation.validateUserSignup, userValidation.isUserValid, userController.addUser)
router.post('/signin', userValidation.validateUserSignIn, userValidation.isUserValid, userController.userSignin)
router.post('/test', isAuth, (req,res) =>{
    res.send({message: 'welcome'})
})

module.exports = router;