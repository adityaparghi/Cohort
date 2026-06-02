require('dotenv').config({
    path: '../.env'
});
const bcrypt = require('bcrypt');
const dns  = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const JWT_SECRET = process.env.JWT_SECRET;
const {z} = require("zod");

const {UserModel, TodoModel} = require("./db");

mongoose.connect(process.env.MONGO_URL)// /database, but it will automatically create if it doesnt exots but we have to put the name here
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err)); 
const app = express();
app.use(express.json());

app.post("/signup", async function(req, res){

    const requiredBody = z.object({
        email: z.string().min(3).max(50),
        password: z.string(),
        name: z.string()
    })

    // const parsedData = requiredBody.parse(req.body);
    const parseData = requiredBody.safeParse(req.body);

    if(!parseData.success){
        res.json({
            message: "incorrect Format"
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const hashedPassword = await bcrypt.hash(password, 5);
    let errorThrown = false;
    try {
        await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
    })
    } catch (error) {
        console.log("Stop putting same email ID dumbass");
        res.json({
            message: "User already exists"
        });
        errorThrown = true;
    }

    if(!errorThrown){
        res.json({
            message: "you are signed up"
        })
    }


});

app.post("/signin",async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const response =  await UserModel.findOne({
        email: email
    })

    if(!response){
        res.status(403).json({
            message : "User doesn't exists"
        })
    }

    const passwordMatch = await bcrypt.compare(password, response.password)

    if(passwordMatch){
        const token = jwt.sign({
           id: response._id.toString() // _id will act as unique identifyr which will get from token
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