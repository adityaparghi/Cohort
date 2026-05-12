const express = require("express");

const app = express();

//middleware that logs the url, method and timestamp

function middleware(req,res,next){
    console.log("Method is "  + req.method);
    console.log("url is "  + req.hostname);
    console.log("url is "  + req.url);
    console.log(new Date());
    next();
}

app.use(middleware);

app.get("/sum", function(req, res) {

});

app.get("/multiply", function(req, res) {
    
});

app.get("/divide", function(req, res) {
    

});

app.get("/subtract", function(req, res) {

});

app.listen(3000);