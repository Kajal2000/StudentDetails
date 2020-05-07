const knexData = require('../connection.js');

let rolePost = (roleData)=>{
    return knexData("roleType").insert(roleData)
}

let SingUpPost = (data)=>{
    return knexData("SignUp").insert(data)
}

let email_data = (Email) => {
    return knexData.select("*").from("SignUp").havingIn("Email",Email)
}

let password_data = (Password) => {
    return knexData.select("*").from("SignUp").havingIn("Password",Password)
}

let get_student = (Role_Id)=>{
    return knexData.select("*").from("roleType").where("Role_Id",Role_Id)
}

let get_roleData = (search)=>{
    return knexData.from("roleType").where("roleType.RoleType","like","%" + search+ "%")
}

let post = (Post_data)=>{
    return knexData("Student_deatils_data").insert(Post_data)
}

let update = (update_data,Id)=>{
    return knexData("Student_deatils_data").update(update_data,Id)
}

let get_data = (Id)=>{
    return knexData.select("*").from("Student_deatils_data").where("Student_deatils_data.Id",Id)
}

let search_data = (search)=>{
    return knexData.select("*")
    .from("Student_deatils_data").where("Student_deatils_data.Student_Name","like","%" + search+ "%")
}

let delete_data = (Id) => {
    return knexData('Student_deatils_data')
    .where("Student_deatils_data.Id" ,Id) 
    .del()
}

module.exports = {SingUpPost,email_data,
    password_data,post,update,get_data,search_data,
    delete_data,rolePost,get_roleData,get_student}
