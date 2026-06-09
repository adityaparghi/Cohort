const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD = "uhhhhh"

adminRouter.post('/signup', async function(req, res){
    const {email, password, firstName, lastName} = req.body;

    try {
       await adminModel.create({
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
        message: "signup endpoint hit,admin creted successfuly"
    })
})

adminRouter.post('/signin',async function(req, res){
    const {email, password} = req.body;

  const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD)

        res.json({
            token: token
        })

    }else{
        res.status(403).json({
        message: "Incorrect credentials"
        })
    }
})

adminRouter.post('/course', function(req, res){
    res.json({
        message: "admin course"
    })
})

adminRouter.put('/course', function(req, res){
    res.json({
        message: "admin course put"
    })
})

adminRouter.get('/course/bulk', function(req, res){
    res.json({
        message: "admin all course"
    })
})

module.exports = {
    adminRouter: adminRouter
}