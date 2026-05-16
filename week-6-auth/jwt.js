const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "ilovekylie";

const app = express();
app.use(express.json());

const users = [];
//{username: "aditya", password: "ilove"}


app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(u => u.username === username)){ // .find expects callback function
        res.json({
            message: "You have already signed up"
        })
        return
    }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "you are signed up"
    })

    console.log(users)
})

app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    let found = null;
    for(let i=0; i< users.length;i++){
        if(users[i].username === username && users[i].password === password){
            found = users[i];
        }
    }

    if(found){

        const token = jwt.sign({
            username: username
        },JWT_SECRET);
        
        res.json({
            token: token
        })
    }else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
    console.log(users);

    // if(users.find(u => u.username === username && u.password === password)){
    //     return true;
    // }else{
    //     return false;
    // }

})

app.get('/me', function(req,res){
    const token = req.headers.token; //jwt
    const decodeInfo = jwt.verify(token, JWT_SECRET); //return json 
    const username = decodeInfo.username;

    const found =  users.find(u => u.username === username);

    if(found){
        res.json({
            username: found.username,
            password: found.password
        })
    }else{
        res.json({
            message: "token Invalid"
        })
    }
})

app.listen(3000);