const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())

const appDB  = require("../Model/appDB")
var jwt = require('jsonwebtoken');


app.post("/roleApi",(req,res)=>{
    roleData = {
        RoleType : req.body.RoleType
    }
    appDB.rolePost(roleData)
    .then(()=>{
        res.send("inserted post")
    }).catch((err)=>{
        res.send(err)
    })
})

app.post("/SignUp",(req,res)=>{
    let data = {
        UserName: req.body.UserName,
        Email : req.body.Email,
        Password : req.body.Password,
        Role_Id : req.body.Role_Id
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
    .then((store_data) => {
        if (store_data.length == 0){
            res.send("Email is wrong")
        }else{appDB.password_data(Password)
            .then((store_data) =>{
            if (store_data.length == 0){
                res.send("Password is wrong")
            }else{
                let newToken = jwt.sign({ "appDB" : store_data},"kajal")
                    res.cookie(newToken)
                    res.send('loing successsful')
                }
            })
        }
    }).catch((err)=>{
        console.log(err); 
    })
});

app.post("/deatilsApi",(req,res)=>{
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal',(err,data) => {
        var studentId = data["appDB"][0]['Role_Id']
        appDB.get_student(studentId)
        .then((storeData)=>{
            var get_student_id = storeData[0]["Role_Id"]
            if (get_student_id == studentId){
            let Post_data = {
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
                Role_Id : req.body.Role_Id
            }
            appDB.post(Post_data)
            .then(()=>{
                res.send("inserted data")
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
})
});
app.put("/putApi/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal',(err,data) => {
        var studentId = data["appDB"][0]['Role_Id']
        appDB.get_student()
        .then((storeData)=>{
            var get_student_id = storeData[0]["Role_Id"]
            if (get_student_id == studentId){
            let update_data = {
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
                Role_Id : req.body.Role_Id
            }
            appDB.update(update_data,Id)
            .then(()=>{
                res.send("updated data")
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
})
});

app.get("/getApi/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal',(err,data) => {
        var studentId = data["appDB"][0]['Role_Id']
        // appDB.get_student(Id)
        if (Id == studentId){
            appDB.get_data(Id)
            .then((resp_data)=>{
                res.send(resp_data)
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
});

app.get("/nameSearch/:search",(req,res)=>{
    let search = req.params.search
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal',(err,data) => {
        var UserName = data["appDB"][0]['UserName']
        // appDB.get_student(search)
        if (search == UserName){
            appDB.search_data(search)
            .then((data) => {
                res.send(data)
            }).catch((err) => {
                res.send(err)
            })
        }
    })
});

app.get("/deleteApi/:Id",(req,res)=>{
    let Id = req.params.Id
    var alltoken = req.headers.cookie
    var token = alltoken.split('=undefined')
    token = (token[token.length-2]).slice(2,600)
    jwt.verify(token, 'kajal',(err,data) => {
        var Role_Id = data["appDB"][0]['Role_Id']
        if (Id == Role_Id){
            appDB.delete_data(Id)
            .then(() => {
                res.send("deleted data")
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
});

module.exports = app;
