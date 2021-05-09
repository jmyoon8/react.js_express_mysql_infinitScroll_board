import React from 'react'
import '../../CSSS/cc.css'

function NoticeContent(props) {
    const {category_id,contents,created_at,id,title,updated_at,user_id,page}=props
    const goToContent =()=>{
        props.history.push(`/content/${id}`)
    }
    return (
        <div onClick={goToContent} className="postingContainer">
            <div className="categoryName">
                <p>
                {category_id===1?'apple':category_id===2?'banana':category_id===3&&'coconut'}
                </p>
                <p>
                {id}번
                </p>
            </div>
            <div className="postingDate">
                <div className="userId">
                    {user_id}
                    {page}
                </div>
                <div className="createDate">
                        created_at({created_at.split('T')[0]})
                </div>
            </div>
            <div className="title nodrag">
                {title}
            </div>
            <div className="noitceContent nodrag">
                {contents}
            </div>
        </div>
    )
}

export default NoticeContent
