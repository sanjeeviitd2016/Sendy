const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error")
const path= require('path')


const app = express();
if(process.env.NODE_ENV !=='PRODUCTION') {
require("dotenv").config({ path: __dirname + "/config/.env" });

}
require("./config/database.js");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());


const userRouter= require("./routes/userRoute");
const postRouter= require('./routes/postRoute')


app.use("/",userRouter);
app.use('/',postRouter);

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.use(errorMiddleware)




module.exports = app;

