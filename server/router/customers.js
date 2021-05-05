const express=require('express')
const app=express();
let mysql=""

if(process.env.NODE_ENV==='production'){
        mysql=require('../config/productDataBase')
}else{
        mysql=require('../config/database')
}
const customers=express.Router()
   
const bs=require('../models/BoardService')


customers.get('/customerBoard',async (req,res)=>{
       
        
        //게시판 페이징 처리
        //게시판 페이징
        let cnt=0               //총글수
        let pageSize=5         //한 페이지당 출력한 글 갯수
        let number=0;           //화면에 뿌려줄 글번호(절대적 number)
        let start=0             //현재 페이지 시작 글번호
        let end =0              //현재 페이지 마지막 글번호
        
        let pageCount=0         //총 페이지 갯수
        let pageBlock=3         //한 블럭당 페이징 겟수
        let startPage=0         //한 블럭에 나올 첫페이지
        let endPage=0           //한 블럭에 나올 마지막 페이지
        
        let currentPage=0       //현제페이지 번호

       
       bs.boardCnt((err, result) => {
                if (err)return console.log(err)
                cnt = result[0].cnt
                //현제페이지 설정
               
                currentPage=req.query.currentPage
               
                //총페이지 갯수 구하기
                pageCount=(cnt/pageSize)+(cnt%pageSize>0?1:0)
                pageCount=Math.floor(pageCount)        
                if(currentPage==1){
                        start=0
                        //limit의 a,b중 a
                }else{
                        start=(currentPage-1)*pageSize
                }
                //보여질 글번호
                number=cnt-(currentPage-1)*pageSize
                
                //한블럭의 시작페이지 번호
                startPage=Math.floor(currentPage/pageBlock)
                startPage=startPage*pageBlock+1
                if(currentPage%pageBlock===0)startPage-=pageBlock;

                //한블럭의 마지막 페이지 번호
                endPage=startPage+pageBlock-1
                if(endPage>pageCount)endPage=pageCount
                endPage=Math.floor(endPage)
                

                console.log("총글수 : ",cnt)
                console.log("현제페이지 : ",currentPage)
                console.log("총페이지 : ",pageCount)
                console.log("시작글의 순번 : ",start)
                console.log("보여질 글번호 : "+number)
                console.log("한블럭에 시작 페이지번호 : "+startPage)
                console.log("한블럭에 마지막 페이지번호 : "+endPage)

                if(cnt>0){
                        let page={
                                cnt:cnt,
                                currentPage:currentPage,
                                pageCount:pageCount,
                                start:start,
                                number:number,
                                startPage:startPage,
                                endPage:endPage
                        }
                       bs.customerList({start:start,pageSize:pageSize},(err,list)=>{
                               if(err)return console.log(err)
                               Object.assign(page,{list:list})
                               res.json(page)
                       })
                }

        })
        
       
        
        
        

        // mysql.query(
        //         "SELECT * FROM CUSTOMER WHERE isDeleted=0" ,(err,rows,fields)=>{
        //                 if(err)return console.log(err)
                        
        //                 res.json(rows)
        //         })
                
})

        
const multer=require('multer')
//업로트 파일이 저장되는 폴더 지정
const upload=multer({storage:multer.diskStorage({
        destination:"./server/images",
        filename:function(req,file,cb){
                cb(null,"imgfile"+Date.now()+file.originalname)
                // 파일 네임을 지정하지 않는다면 알아서 자동으로 생성해준다.
        }}),/*limits:{fileSize:10000000} 파일 크기 제한 단위는 byte*/ })


//중간에 fomdata를 캐치헤서 그중 image가 키값인 값을 캐치한뒤 지정한 경로로 데이터를 저장
customers.post('/customerAdd',upload.single('image'),(req,res)=>{
        
        let sql='INSERT INTO CUSTOMER VALUES(null,?,?,?,?,?,now(),0)'
        let image='/images/'+req.file.filename
        let name=req.body.name
        let birthday=req.body.birthday
        let gender=req.body.gender
        let job=req.body.job
        let params=[image,name,birthday,gender,job]

        mysql.query(sql,params,(err,rows,field)=>{
                if(err)return console.log(err)
                res.json(rows)
        })
        
})
customers.delete('/customerDelete/:id',(req,res)=>{
        let sql ="UPDATE CUSTOMER SET isDeleted = 1 where id =?"
        let params=[req.params.id]
        mysql.query(sql,params,(err,rows,fields)=>{
                if(err) return console.log(err)
                res.json(rows)
        })

})

module.exports=customers