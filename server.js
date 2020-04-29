const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

const data1 = require("./Rotues/app")
app.use("/Apis",data1)

const data2 = require("./Rotues/admin")
app.use("/Api",data2)

app.listen(8000,()=>{
    console.log("server is listening..............)")
});
