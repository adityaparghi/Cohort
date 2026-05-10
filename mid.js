const express = require('express');

const app = express();

function checkerMiddleware(req,res,next){
    const age = req.query.age;
    if(age > 18){
        next();
    }else{
         res.json({
            msg:"you are not allowed"
        });
    }
}


app.get('/ride',checkerMiddleware, function(req, res){
    return res.json({msg:"you are allowed"});

});

app.get('/ride2',checkerMiddleware, function(req, res){
    return res.json({msg:"you are allowed"});
});


app.listen(3000);