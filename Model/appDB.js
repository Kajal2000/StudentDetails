const knexData = require('../connection.js');

let SingUpPost = (data)=>{
    return knexData("SignUp").insert(data)
}

let email_data = (Email) => {
    return knexData.select("*").from("SignUp").havingIn("Email",Email)
}

let password_data = (Password) => {
    return knexData.select("*").from("SignUp").havingIn("Password",Password)
}


module.exports = {SingUpPost,email_data,password_data}
