let knexData = require('./connection.js')

// first tbl/SingUP tbl
knexData.schema.createTable('SignUp', (table) => {
    table.increments("UserId")
    table.string('UserName');
    table.string('Email');
    table.string('Password');
    }).then(()=>{
        console.log("created tbl")
    }).catch((err)=>{
        console.log(err,"some error")
    })


knexData.schema.createTable('Student_deatils_data', (table) => {
    table.increments("Id")
    table.string('Mother_Name');
    table.string('Father_Name');
    table.string('Student_Name');
    table.integer('Student_Age');
    table.string('Education');
    table.string('Email_Id');
    table.integer('Phone_No');
    table.integer('Aadhar_card');
    table.string("Pan_card");
    table.string("Voter_id_card")
    table.string("Address")
    table.string("Student_Photo")
    }).then(()=>{
        console.log("tbl created")
    }).catch((err)=>{
        console.log(err,"there is some err")
    })
