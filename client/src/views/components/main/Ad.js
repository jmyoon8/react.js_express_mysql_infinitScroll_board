import React from 'react'

function Ad(props) {

    const {contents,created_at,id,img,title,updated_at}=props

    return (
        <div className="adcontainer">
            <div className="sponserd">
                sponserd
            </div>
            <div className="adcontent">
                <div className="imgContainer">
                    <img className="img" src={`https://cdn.comento.kr/assignment/${img}`} />
                </div>
                
                <div className="adcontentContainer">
                    <div className="adtitle">
                    {title}
                    </div>
                    <div className="adSub">
                        {contents}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Ad


