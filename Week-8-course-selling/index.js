const express = require("express");
require('dotenv').config({path: '../.env'});
const dns  = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const {userRouter} = require("./routes/user");
const {courseRouter} = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const { mongoose } = require("mongoose");

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/course', courseRouter);
app.use('/admin', adminRouter);

async function main(){
    try {
        await mongoose.connect(process.env.MONGO_COURSE);
        console.log("DB connected");
        app.listen(3000, () => {
            console.log("listening on port 3k");
        })
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
}

main()
