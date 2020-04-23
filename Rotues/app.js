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
    let Password = req.body.Password
    appDB.email_data(Email)
    .then((logindata) => {
        if (logindata.length == 0){
            res.send("Email is wrong")
        }else{appDB.password_data(Password).then((logindata) =>{
            if (logindata.length == 0){
                res.send("Password is wrong")
                }
            })
        }
        res.send("login success")
    })
})

app.post("/PostDeatilsApi",(req,res)=>{
    Post_data = {
        Mother_Name : req.body.Mother_Name,
        Father_Name : req.body.Father_Name,
        Student_Name : req.body.Student_Name,
        Student_Age : req.body.Student_Age,
        Education : req.body.Education,
        Email_Id : req.body.Email_Id,
        Phone_No : req.body.Phone_No,
        Aadhar_card : req.body.Aadhar_card,
        Pan_card : req.body.Pan_card,
        Voter_id_card : req.body.Voter_id_card,
        Address : req.body.Address,
        Student_Photo : req.body.Student_Photo
    }
    appDB.post(Post_data)
    .then(()=>{
        res.send("inserted data")
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = app;
