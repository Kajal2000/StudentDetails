const knex = require('../connection.js');

let get_superAdmin_id = (Role_Id)=>{
    return knex.select("*").from("roleType").where("Role_Id",Role_Id)
}

let get_all_data = ()=>{
    return knex.select("*").from("Student_deatils_data")
}

let updateAdmin = (Post_data,Id)=>{
    return knex("Student_deatils_data").update(Post_data).where('Student_deatils_data.Id',Id)
}

let updateD = (update_data,Id)=>{
    return knex("Student_deatils_data").update(update_data).where('Student_deatils_data.Id',Id)
}

let DeleteData = (Id)=>{
    return knex("Student_deatils_data")
    .where('Student_deatils_data.Id',Id)
    .del()
}


module.exports = {get_superAdmin_id,get_all_data,updateAdmin,updateD,DeleteData}