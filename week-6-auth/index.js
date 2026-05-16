const express = require('express');

const app = express();
app.use(express.json());

const users = [];
//{username: "aditya", password: "ilove"}

function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
         'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
         'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
         'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

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
        const token = generateToken();
        found.token = token;
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
    const token = req.headers.token;
    const found =  users.find(u => u.token === token);

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