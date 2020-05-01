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
        // console.log(data)
        var Role_Id_sAdmin = data["appDB"][0]["Role_Id"]
        // console.log(Role_Id_sAdmin)
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

superAdmin.put("/updateApi/:Id",(req,res)=>{
    var Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var Role_Id_SuperAdmin = data["appDB"][0]["Role_Id"]
        if (Role_Id_SuperAdmin == "1"){
            var Post_data = {
                Role_Id : req.body.Role_Id
            }
            superAdminDB.updateAdmin(Post_data,Id)
            .then(()=>{
                res.send("update")
            }).catch((err)=>{
                res.send(err)
            })
        }
    })
})

superAdmin.put("/update/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var Role_Id_SuperAdmin = data["appDB"][0]["Role_Id"]
        // console.log(Role_Id_SuperAdmin)
        if (Role_Id_SuperAdmin == "1"){
            var update_data = {
                Id : req.body.Id,
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
                Student_Photo : req.body.Student_Photo,
            }
            superAdminDB.updateD(update_data,Id)
            .then(()=>{
                res.send("updated")
            }).catch((err)=>{
                res.send(err)
            })
        }
        
    })
})

superAdmin.delete("/deleteApi/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var Role_Id_SuperAdmin = data["appDB"][0]["Role_Id"]
        if (Role_Id_SuperAdmin == "1"){
            superAdminDB.DeleteData(Id)
            .then(()=>{
                res.send("deleted")
            }).catch((err)=>{
                res.send(err)
            })
        }
        
    })
})
module.exports = superAdmin;