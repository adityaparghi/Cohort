//creating https server 
const express =  require('express');
const app = express();

function sum(n){
    let ans = 0;
    for(let i=1;i<=n;i++){
        ans = ans+i;
    }
    return ans;
}

app.get("/", function(req,res){
    const n = req.query.n;
    const ans = sum(n);
    res.send("hey sum is " + ans); 
})
app.get('/asd', function(req,res){
    console.log(1/0);
})

app.get('/err', function(req,res){
    throw new Error("asdasd");
})
app.listen(3000);

