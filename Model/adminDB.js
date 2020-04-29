const knex = require('../connection.js');

let get_admin = (Role_Id)=>{
    return knex.select("*").from("roleType").where("Role_Id",Role_Id)
}

module.exports = {get_admin}