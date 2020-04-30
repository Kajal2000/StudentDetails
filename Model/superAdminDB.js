const knex = require('../connection.js');

let get_superAdmin_id = (Role_Id)=>{
    return knex.select("*").from("roleType").where("Role_Id",Role_Id)
}

let get_all_data = ()=>{
    return knex.select("*").from("Student_deatils_data")
}

let getAll = () => {
    return knex("Student_deatils_data")
    .join('roleType','Student_deatils_data.Id','=','roleType.Role_Id')
    .select("*")
}

// let getAll = (Role_Id) => {
//     return knex("roleType")
//     .join('Student_deatils_data','roleType.Role_Id','=','Student_deatils_data.Id')
//     .select("*")

// }
module.exports = {get_superAdmin_id,get_all_data,getAll}