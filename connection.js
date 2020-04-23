var knex = require('knex')({
    client: 'mysql',
    version: '5.7',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : 'Kajal@123',
        database : 'StudentDeatils'
    }
  });
module.exports = knex;
