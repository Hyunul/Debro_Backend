var mysql = require('mysql2');
var db = mysql.createConnection({
    host: 'capstone-db.cfdsrnexrnxy.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '12341234',
    database: 'debrodb',
});
db.connect();

module.exports = db;
