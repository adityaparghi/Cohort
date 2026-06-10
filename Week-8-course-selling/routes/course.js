const {Router} = require("express");
const { purchaseModel, courseModel } = require("../db");
const { userMiddleware } = require("../middleware/user");
const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware,async function(req, res){
    const userId = req.userId;
    const courseId = req.courseId;

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

     res.json({
        message: "post purchase endpoint"
    })
})

courseRouter.get('/preview',async function(req, res){


   const courses = await courseModel.find({});

     res.json({
        courses,
        message: "preview endpoint"
    })
})

module.exports = {
    courseRouter: courseRouter
}