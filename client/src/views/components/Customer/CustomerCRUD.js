import React,{ Suspense, useEffect, useState } from 'react';
import Customer from './Customer'
import CustomerAdd from'./CustomerAdd'
import Table from'@material-ui/core/Table'
import TableHead from'@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableBody from'@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from'@material-ui/core/CircularProgress'
import axios from'axios'
import { withRouter } from 'react-router-dom';
import url from'../../../enum'

const useStyle=makeStyles({
  root:{
    with :"100%",
    marginTop : "150px",
    overflowX:"auto"
  },
  table:{
    minWidth:"1080px"
  },
  progress:{
    marginTop:"20px"
   
  }
})

function CustomerCRUD(props) {

  const [completed,setCompleted]=useState({progress:0})
  const [customer,setCustomer]=useState([])
  const [reset,setReset]=useState(true)
  const [paging,setPaging]=useState({cnt:0,pageCount:0,start:0,number:0,startPage:0,endPage:0})
  const [currentPage,setCurrentPage]=useState(1)
  const [pageBlock,setPageBlock]=useState([])

  const progressFunc =()=>{
    if(completed.progress<=100){
        completed.progress=parseInt(completed.progress+1)
    }else{
        completed.progress=1
    }
    setCompleted({progress:completed.progress})
  }
  

  useEffect( async () => {
    var inter=setInterval(() => {
      progressFunc()
    }, 150);
   
      await axios.get(url+'api/customers/customerBoard',{params:{currentPage:currentPage}})
      .then(res=>{
        //개시물 정보 가져오기
        setCustomer(res.data.list)
        delete res.data.list
        setPaging(res.data)
        //페이징 처리정보 setting
        paging.cnt=res.data.cnt
        paging.pageCount=res.data.pageCount
        paging.start=res.data.start
        paging.number=res.data.number
        paging.startPage=res.data.startPage
        paging.endPage=res.data.endPage
        console.log(paging)
        console.log(currentPage)
        console.log("페이징!")
      })
      .catch(err=>console.log(err))
  
 
    completed.progress=0
    clearInterval(inter)
    console.log("시작"+paging.startPage)
    console.log("끝"+paging.endPage)
    
    pageBlock.length=0

    let pageArray=[]
    for(let i=paging.startPage; i<=paging.endPage; i++){
        pageArray.push(i)
        console.log("페이징"+i)
      }
    console.log(pageArray)
    setPageBlock([...pageBlock,...pageArray])
    
  }, [reset,currentPage])

  const pageHandler=(where,pageNum)=>{
      if(where==='first'){
        setCurrentPage(1)
      }else if(where==='last'){
         setCurrentPage(paging.pageCount) 
      }else if(where==='plusOneStep'){
        currentPage>1?setCurrentPage(currentPage-1):setCurrentPage(currentPage)
      }else if(where==='minusOneStep'){
        currentPage===paging.pageCount?setCurrentPage(currentPage):setCurrentPage(currentPage+1)
      }else if(where==='switchPage'){
        setCurrentPage(pageNum)
      }

      
   
  }
  


  const classes =useStyle();
  return (
    <Suspense fallback={(<div>loading....</div>)}>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>아이디</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생일</TableCell>
                <TableCell>직업</TableCell>
                <TableCell>기능</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {paging.cnt>0?customer.map((value,index)=>
            <>
                <Customer key={index} number={paging.number-index}
                          id={value.id} name={value.name}
                          img={value.image} birthday={value.birthday}
                          gender={value.gender} job={value.job}
                          reset={reset} setReset={setReset}
                          />
                          {value.image}
             </>             
            ):"list가 없습니다."}
            
            <TableRow>
              <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={completed.progress}/>
              </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>
                    <p onClick={()=>pageHandler('first')}>처음으로</p>
                </TableCell>
                <TableCell>
                    <p onClick={()=>pageHandler('plusOneStep')}>{'<'}</p>
                </TableCell>
                <TableCell>
                  {pageBlock.map((value,index)=>{
                    return value!==currentPage?<a key={index} onClick={()=>pageHandler('switchPage',value)} >[{value}]</a>:<a  onClick={()=>pageHandler('switchPage',value)} key={index} style={{fontSize:'25px'}}>[{value}]</a>
                  })}
                </TableCell>
                <TableCell>
                    <p onClick={()=>pageHandler('minusOneStep')}>{'>'}</p>
                </TableCell>
                <TableCell>
                    <p onClick={()=>pageHandler('last')}>마지막으로</p>
                </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <div style={{display:'flex',flexDirection:'column', alignItems:'center',width:'100%'}} >
        <CustomerAdd reset={reset} setReset={setReset}/>
      </div>
    </Suspense>
   
  );
}

export default withRouter(CustomerCRUD);
