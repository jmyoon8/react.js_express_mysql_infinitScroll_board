////database connection
const mysql=require('mysql');


var db_config = {
    // host:"myaws.cf7smk2karlz.ap-northeast-2.rds.amazonaws.com",
    // user:"admin",
    // password:"dbswowls12!",
    host:"us-cdbr-east-03.cleardb.com",
    user:'b12d0cdac395f7',
    password:"92f4f08b",
    database:"heroku_a5bf4153d4f0a48"
    //커낵션풀 갯수를 재한 할 수도 있다. connectionLimit:4
  };
  
let connecting=mysql.createPool(db_config)



//
/*
커넥션을 땡오면 트랜젝션을 사용 할 수있다.
let connection=connecting.getConnection(async conn=>conn);
커넥션에 sql 입력
connection.query(sql.[파라미터],(err,result,field)=>{})
트랜젝션 시작
connection.beginTransaction() : 트랜잭션 시작
connection.commit()           : sql이 실행되고 그 실행결과를 commit
connection.rollback()         : sql이 실행되고 그 실행결과가 에러가 있을경우 rollback
connection.release()          : 실행을 마무리한뒤 커넥션을 반납(꼭해야한다)

*/

  
  
// var connecting;
// function handleDisconnect() {

//     connecting = mysql.createPool(db_config); // Recreate the connection, since
//                                                 // the old one cannot be reused.

//     connecting.connect(function(err) {              // The server is either down
//     if(err) {                                     // or restarting (takes a while sometimes).
//     console.log('error when connecting to db:', err);
//     setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
//     }                                     // to avoid a hot loop, and to allow our node script to
// });                                     // process asynchronous requests in the meantime.
//                                         // If you're also serving http, display a 503 error.
//     connecting.on('error', function(err) {
//     console.log('db error', err);
//     if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
//     handleDisconnect();                         // lost due to either server restart, or a
//     } else {                                      // connnection idle timeout (the wait_timeout
//     throw err;                                  // server variable configures this)
//     }
// });
// }

// handleDisconnect();


//그리고 exports
module.exports=connecting