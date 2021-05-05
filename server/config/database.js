////database connection
const mysql=require('mysql');

const connecting=mysql.createPool({
    host:"localhost",
    user:'root',
    password:"1234",
    port:"3306",
    database:"board"
})
//연결완료





//그리고 exports
module.exports=connecting
