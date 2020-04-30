const express = require('express');
const superAdmin = express.Router();
const superAdminDB  = require("../Model/superAdminDB")
var jwt = require('jsonwebtoken');


superAdmin.get("/sAdminApi/:Role_Id",(req,res)=>{
    let Role_Id = req.params.Role_Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var Role_Id_sAdmin = data["appDB"][0]["Role_Id"]
        superAdminDB.get_superAdmin_id(Role_Id)
        .then((data)=>{
            let superAdminData = data[0]["Role_Id"]
            if (superAdminData == Role_Id_sAdmin){
                superAdminDB.get_all_data()
                .then((resp_data)=>{
                    res.send(resp_data)
                }).catch((err)=>{
                    console.log(err)
                }) 
            }
            else{
                console.log(err,"you can't access")
            }
        }).catch((err) => {
            res.send(err)
        })  
    })
});


module.exports = superAdmin;