const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");

adminRouter.post('/signup', function(req, res){
    res.json({
        message: "admin signup"
    })
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