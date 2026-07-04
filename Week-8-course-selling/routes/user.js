const { Router } = require("express");
const { userModel, courseModel } = require("../db");
const userRouter = Router();
const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require('../config');
const { userMiddleware } = require("../middleware/user");
const course = require("./course");

userRouter.post('/signup', async function (req, res) {
    const { email, password, firstName, lastName } = req.body;

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

userRouter.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD)

        res.json({
            token: token
        })

    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get('/purchases', userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });

    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    res.json({
        purchases,
        courseData,
        message: "purchase endpoint"
    })
})

module.exports = {
    userRouter: userRouter
}