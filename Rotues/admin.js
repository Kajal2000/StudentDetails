const express = require('express');
const admin = express();
const adminDB  = require("../Model/adminDB")
var jwt = require('jsonwebtoken');


admin.get("/AdminApi/:Role_Id",(req,res)=>{
    let Role_Id = req.params.Role_Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var Role_Id_Admin = data['appDB'][0]['Role_Id']
        adminDB.get_admin(Role_Id)
        .then((data)=>{
            let adminData = data[0]["Role_Id"]
            if (adminData == Role_Id_Admin){
                adminDB.get_datas()
                .then((resp_data)=>{
                    res.send(resp_data)
                }).catch((err)=>{
                    console.log(err)
                }) 
            }
            else{
                console.log("you can't acess")
            }
        })
    })
});

admin.get("/nameSearch/:search",(req,res)=>{
    let search = req.params.search
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        var admin_search = data['appDB'][0]['UserName']
        if (admin_search == search){
            adminDB.search_data(search)
            .then((data)=>{
                res.send(data)
            }).catch((err)=>{
                res.send(err)
            })
        }
    })
})

admin.put("/updateApi",(req,res)=>{
    // let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        adminUpdat =  data['appDB'][0]['Role_Id']
        adminDB.all_get_admin()
        .then((data)=>{
            let adminIdGet = data[1]["Role_Id"]
            if(adminUpdat == adminIdGet){
                update_data = {
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
                adminDB.update(update_data,Id)
                .then(()=>{
                    res.send("updated data")
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
    })
})

admin.delete("/deleteApi/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal', (err,data) => {
        adminUpdat =  data['appDB'][0]['Role_Id']
        adminDB.all_get_admin(Id)
        .then((data)=>{
            // console.log(data)
            let adminIdGet = data[1]["Role_Id"]
            if(adminIdGet == adminIdGet){
                adminDB.delete_data(Id)
                .then(()=>{
                    res.send("deleted data")
                }).catch((err)=>{
                    console.log(err)
                })
            }
        })
    })
})


module.exports = admin;
