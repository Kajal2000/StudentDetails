const express = require('express');
const app = express();
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

app.post("/deatilsApi/:search",(req,res)=>{
    let search = req.params.search 
    appDB.get_roleData(search)
    .then((respData)=>{
        let storeData = respData[0]["RoleType"]
        if (storeData == "Student"){
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

app.put("/updateApi/:Id",(req,res)=>{
    let Id = req.params.Id
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
    appDB.update(update_data,Id)
    .then(()=>{
        res.send("updated data")
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/getApi/:Id",(req,res)=>{
    let Id = req.params.Id
    appDB.get_data(Id)
    .then((resp_data)=>{
        res.send(resp_data)
    }).catch((err)=>{
        console.log(err)
    })
})

app.get("/nameSearch/:search",(req,res)=>{
    let search = req.params.search
    appDB.search_data(search)
    .then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

app.delete("/deleteApi/:Id",(req,res)=>{
    let Id = req.params.Id
    appDB.delete_data(Id)
    .then(()=>{
        res.send("deleted data")
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = app;
