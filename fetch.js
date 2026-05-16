const axios = require("axios");

async function main() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const json = await res.json();
    console.log(json.length);
}

//change headers,send body, change req method, 
//second arg is body and third arg is headers

async function  main1() {
    const res = await axios.get(
        "https://httpdump.app/dumps/88fc52ec-19a6-41bc-9881-caee1d75ec9d",{
            username: "aditya1",
            password: "1234567"
        },{
            headers: {
                Authorization: "Bearer"
            },
        },
    );
    console.log(res);

}

main1();