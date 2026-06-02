require('dotenv').config();
const dns  = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const JWT_SECRET = "AdiLovesAlex";


const {UserModel, TodoModel} = require("./db");

mongoose.connect(process.env.MONGO_URL)// /database, but it will automatically create if it doesnt exots but we have to put the name here
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err)); 
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
        console.log(user._id);
        const token = jwt.sign({
           id: user._id.toString() // _id will act as unique identifyr which will get from token
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

app.post("/todo",auth, function(req, res){ // this will need user_id in req from token -> middleware
    const userId = req.userId;
    const title = req.body.title;

    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId: userId
    })
});

app.get("/todos",auth, async function(req, res){
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId : userId
    })

     res.json({
        todos
    })
});

function auth(req, res, next){
    const token = req.headers.token;
    const verified = jwt.verify(token, JWT_SECRET); //encode Id and decode will get id
    console.log(verified);

    if(verified){
        req.userId = verified.id;
        next();
    }else{
        res.status(403).json({
            message: "you aren't authenticated sir"
        })
    }
}

app.listen(3000)