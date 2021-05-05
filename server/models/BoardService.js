let mysql=""
if(process.env.NODE_ENV==='production'){
    mysql=require('../config/productDataBase')
}else{
    mysql=require('../config/database')
}
let boardService={

     boardCnt:function(cb){
            let query="SELECT count(*) AS cnt FROM CUSTOMER  WHERE isdeleted=0"
            mysql.query(query,(err,result,fields)=>{
                if(err)return cb(err)
                return cb(null,result)
            })
    },
    customerList:function(data,cb){
        let query="SELECT * FROM CUSTOMER WHERE isDeleted=0 limit ?,?" 
        let params=[data.start,data.pageSize]
        mysql.query(
           query,params,(err,result,fields)=>{
                if(err)return cb(err)
                return cb(null,result)
            })
    }
}

module.exports=boardService