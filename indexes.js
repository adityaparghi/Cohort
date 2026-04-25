const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send("hola amigo");
    //res.send("hola amigo"); cant send 2 times error

})

app.post('/ganga',function(req,res){
    res.send("<b>gang member welcomes you in arena</b>");
})

app.get('/gang',function(req,res){
    res.send("gang member welcomes you");
})

app.listen(3000); //makes sure that the process runs infinitely