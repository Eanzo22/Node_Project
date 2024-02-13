require('dotenv').config();

const express = require('express');
const app = express();

require("./DB/index");



/////////////////////////////////////////////////////////
//routes
const userRouter = require('./routes/user.router');  



////////////////////////////////////////////////////////
//middle ware functions
app.use(express.json());
app.use(express.static("public"));


app.use("/api/v1",userRouter);




////////////////////////////////////////////////////////
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Listening on port ${port} ....`);
})