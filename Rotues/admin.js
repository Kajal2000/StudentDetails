const express = require('express');
const admin = express.Router();
const adminDB  = require("../Model/adminDB")


admin.get("/AdminApi/:Role_Id",(req,res)=>{
    let Role_Id = req.params.Role_Id
    adminDB.get_admin(Role_Id)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports = admin;
