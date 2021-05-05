////database connection
const mysql=require('mysql');

const connecting=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"1234",
    port:"3306",
    database:"management"
})
//연결완료
connecting.connect();


//그리고 exports
module.exports=connecting