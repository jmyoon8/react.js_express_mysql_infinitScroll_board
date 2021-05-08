import React,{ useState,useEffect} from 'react'
import Ad from './Ad'
import NoticeContent from './NoticeContent'
import Modal from './modal/Modal'
import { api } from '../../../ApiInstance/apis'
import { debounce } from '@material-ui/core'
import '../../CSSS/modal.css'
import '../../CSSS/cc.css'


function LandingPage(props) {
    // 모달 isvisible
    const [filterIsVisible,setFilterIsVisible]=useState(false)
    // 정렬
    const [sort,setSort]=useState('asc')
    //몇페이지에서 져올것인지
    
    const [page,setPage]=useState(1)
    //몇개씩 가져올것인가?
    const [perPage,setPerPage]=useState(10)
    // 글목록
    const [notices,setNotices]=useState([])
    //광고목록
    const [ads,setAds]=useState([])
    //광고를 몇번째 개시물마다 보여줄것인지?
    const [addShow,setAddshow]=useState(4)
    //로컬스토리지
    const [checkedCategory,setCheckedCategory]=useState(JSON.parse(localStorage.getItem('category')))
    
    
    
    useEffect(() => {
          // 글목록
           api.get(`/list`,{
            params:{
                page:page,
                ord:'asc',
                category:["1","2","3"],
                limit:perPage

            }
        }).then(res=>{
            
            
            if(res.data.data.length!=0){
                
                setNotices(notices.concat(res.data.data).sort((a,b)=>{
                    return sort==='asc'? a.id-b.id:b.id-a.id
                    
                }))
            }else{
               
            }
          
            
        })
        sortsetting(sort)

        //광고
         api.get('/ads',{
            params:{
                page:page,
                limit:perPage
            }
        }).then(res=>{
            
            if(res.data.data.length!=0){
                
                setAds(res.data.data)
            }else{
                
            }
        })
        //배열정렬
        
    }, [page])
    
    useEffect(() => {
      
        //필터적용
        setCheckedCategory(JSON.parse(localStorage.getItem('category')))
        
    }, [localStorage.getItem('category')])

   const sortsetting=(sort)=>{
        if(sort==="desc"){
            setNotices(notices.sort((a,b)=>{
                return b.id-a.id
            }))
            setSort('desc')
        }else if(sort==='asc'){
            setNotices(notices.sort((a,b)=>{
                return a.id-b.id
            }))
            setSort('asc')
        }
   }

  
    // 무한 스크롤 코드
    const _scrollHandler=(e)=> {
            
            const tartget=e.target
            
            const scrollHeight=tartget.scrollHeight
            const clientHeight=tartget.clientHeight
            const scrollTop=tartget.scrollTop

            // // console.log(scrollHeight,"전체화면 스크롤")
            // // console.log(scrollTop,"로딩될 스크롤과 화면 맨 위쪽의 차이")
            // // console.log(clientHeight,'현재 무한스크롤 될 element의 높이')
            if(scrollTop+clientHeight===scrollHeight){
                
                setPage((prev)=>prev+1)
            }
    }
    // 스크롤 이벤트 구독/취소
    useEffect(() => {
        
        document.getElementById('scroll').addEventListener('scroll',debounce(_scrollHandler,300))
        
    }, [])

    
    return (
        <>
        <div id="container" className="container">
            <Modal filterIsVisible={filterIsVisible} setFilterIsVisible={setFilterIsVisible}  />
            <div className="label">
                [2021-05-10]윤재진
            </div>
            <div className="content" >
                <button onClick={_scrollHandler}  className="loginButton">
                    로그인
                </button>
               
                <div id='board' className="board">

                    <div className="sort">
                        <div className="sortcontainer">
                            <div onClick={()=>sortsetting('asc')}>
                                <div className="led" style={{backgroundColor:sort==="asc"&&'#00c854'}}></div>오름차순
                            </div>
                            <div onClick={()=>sortsetting('desc')}>
                                <div className="led" style={{backgroundColor:sort==="desc"&&'#00c854'}} ></div>내림차순
                            </div>
                        </div>
                        <div onClick={()=>setFilterIsVisible(!filterIsVisible)} className="filter">
                            필터
                        </div>
                    </div>
                    
                   
                   <div id="scroll" className="overflowDiv"  >
                       

                        {   
                            ads.length>0&&
                            notices.map((value,index)=>{
                                // 인덱스가 4의 배수일 경우 광고를 같이 노출시킨다.
                                index=index+1
                                
                                let arr =checkedCategory.map(value=>{
                                    return value.category
                                })
                                
                                if(index%(addShow)===0){  
                                    //   광고를 랜덤으로 노출시킨다.
                                    let adnumber=Math.floor(Math.random() * perPage)
                                    
                                    return(
                                        <>
                                            <Ad
                                                key={ads[adnumber].contents}
                                                contents={ads[adnumber].contents}
                                                created_at={ads[adnumber].created_at}
                                                id={ads[adnumber].id}
                                                img={ads[adnumber].img}
                                                title={ads[adnumber].title}
                                                updated_at={ads[adnumber].updated_at}

                                            />
                                            {
                                                //필터링
                                               arr.indexOf(value.category_id.toString())!=-1&&
                                               <NoticeContent 
                                               page={page}
                                               key={value.created_at}
                                               category_id={value.category_id} 
                                               contents={value.contents}
                                               created_at={value.created_at}
                                               id={value.id}
                                               title={value.title}
                                               updated_at={value.updated_at}
                                               user_id={value.user_id}
                                               history={props.history}
                                           />
                                            }
                                        
                                          
                                           
                                        </>
                                    )
                                }else{
                                    
                                    return (
                                            <>
                                            {
                                                //필터링
                                                arr.indexOf(value.category_id.toString())!=-1&&
                                                <NoticeContent 
                                                    key={value.id}
                                                    category_id={value.category_id} 
                                                    contents={value.contents}
                                                    created_at={value.created_at}
                                                    id={value.id}
                                                    title={value.title}
                                                    updated_at={value.updated_at}
                                                    user_id={value.user_id}
                                                    history={props.history}
                                            
                                                />
                                            }
                                            
                                            </>
                                        )
                                }
                            })
                        }
                        {/* 개시물 */}
                       
                        
                      
                   </div>
                   
                </div>

            
            </div>
        </div>
        </>
    )
}

export default LandingPage

