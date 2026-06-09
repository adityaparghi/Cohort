const {Router} = require("express");
const { userModel } = require("../db");
const userRouter = Router();
const jwt = require('jsonwebtoken');
const JWT_USER_PASSWORD = "shhhhhhhhh"

userRouter.post('/signup', async function(req, res){
    const {email, password, firstName, lastName} = req.body;

    try {
       await userModel.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        })
    } catch (error) {
        res.json({
            message: "Sign up failed, try again later"
        })
    }
    res.json({
        message: "signup endpoint hit,user creted successfuly"
    })
})

userRouter.post('/signin', async function(req, res){
    const {email, password} = req.body;

  const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(user){
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

        res.json({
            token: token
        })

    }else{
        res.status(403).json({
        message: "Incorrect credentials"
        })
    }
})

userRouter.get('/purchases', function(req, res){
     res.json({
        message: "purchase endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}