import React,{ useState,useEffect} from 'react'
import { api } from '../../../ApiInstance/apis'
import '../../CSSS/content.css'


function Content(props) {
    
    
    const id =props.match.params.id
    const [data,setData]=useState("")
    useEffect(() => {
        api.get('/view',{
            params:{
                id:id
            }
        }).then(res=>{
            
            setData(res.data.data)
        })
    }, [])
    
    const copy =(where)=>{
        
            let text=document.getElementById(where).textContent
            
            navigator.clipboard.writeText(text).then(res=>{
                alert('글을 복사했습니다.!')
            })
        
    }
    return (
        <>
      
        <div  className="conTentcontainer" >
            
            <div className="conTentlabel">
                [2021-05-10]윤재진
            </div>
            <div className="conTentcontent" >
               
                <div  className="conTentboard">
                   
                   
                   <div  className="conTentpostingContainer">
                        <div className="conTentTitleName nodrag">
                            {data.title}
                        </div>
                        <div id="content" className="conTentnoitceContent nodrag">
                            {data.contents}
                        </div>
                        <div className="conTentdate">
                           create_at({data.created_at?.split('T')[0]})
                           <div onClick={()=>copy('content')} >
                                글복사
                            </div>
                        </div>
                    </div>    
                    <div className="conTentreply">
                        <div>
                            답번
                        </div> 
                         <div className="number">
                            {data.reply?.length}
                        </div>  
                        
                    </div>     
                    
                        {
                            data.reply?.map((value,index)=>{
                                return(
                                    <div key={value.contents}  className="conTentReplyContainer">
                                        <div className="reply_user_name">
                                            {value.user.name}
                                        </div>
                                        <div id="reply" className="replyContent">
                                            {value.contents}
                                        </div>
                                        <div className="date">
                                            {value.created_at.split('T')[0]}
                                            <div onClick={()=>copy('reply')}>
                                                글복사
                                            </div>
                                                
                                        </div>                    

                                    </div>  
                                )
                            })
                        }

                   
                   
                </div>

            
            </div>
        </div>
        </>
        
    )
}

export default Content

