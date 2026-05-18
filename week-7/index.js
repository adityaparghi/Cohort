const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const JWT_SECRET = "AdiLovesAlex";

const {UserModel, TodoModel} = require("./db");

mongoose.connect("mongodb://aditya:AcIoAh4b1MVhQlJt@cluster0.md0xg.mongodb.net/");
const app = express();
app.use(express.json());


app.post("/signup", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

   await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "you are signed up"
    })

});

app.post("/signin",async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user =  await UserModel.findOne({
        email: email,
        password: password
    })

    console.log(user);

    if(user){
        const token = jwt.sign({
           id: user._id // _id will act as unique identifyr which will get from token
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }else{
        res.status(403).json({
            message:"You aren't authorized"
        })
    }


});

app.post("/todos", function(req, res){

});

app.get("/todos", function(req, res){

});

app.listen(3000)