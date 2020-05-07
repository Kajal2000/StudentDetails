const knex = require('../connection.js');

let get_admin = (Role_Id)=>{
    return knex.select("*").from("roleType").where("Role_Id",Role_Id)
}

let all_get_admin = ()=>{
    return knex.select("*").from("roleType")
}

let get_datas = ()=>{
    return knex.select("*").from("Student_deatils_data")
}

let search_data = (search)=>{
    return knex.select("*")
    .from("Student_deatils_data").where("Student_deatils_data.Student_Name","like","%" + search+ "%")
}

let update = (update_data,Id)=>{
    return knex("Student_deatils_data").update(update_data,Id)
}

let delete_data = (Id) => {
    return knex('Student_deatils_data')
    .where("Student_deatils_data.Id" ,Id) 
    .del()
}
module.exports = {get_admin,get_datas,search_data,update,delete_data,all_get_admin}