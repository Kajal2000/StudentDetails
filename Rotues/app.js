const express = require('express');
const app = express();
const appDB  = require("../Model/appDB")

app.post("/SignUp",(req,res)=>{
    data = {
        UserId : req.body.UserId,
        UserName: req.body.UserName,
        Email : req.body.Email,
        Password : req.body.Password
    }
    appDB.SingUpPost(data)
    .then((respnoe_data)=>{
        res.send(respnoe_data)
        console.log("insterded data")
    }).catch((err)=>{
        console.log(err,"err h")
    })
})

app.post("/login",(req,res)=>{
    let Email = req.body.Email
    appDB.email_data(Email)
    .then((logindata) => {
        res.send(logindata)
        })
    })

module.exports = app;
