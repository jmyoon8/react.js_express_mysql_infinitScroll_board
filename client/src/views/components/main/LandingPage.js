import React from 'react'
import { useState } from 'react'
import Ad from './Ad'
import NoticeContent from './NoticeContent'
import Modal from './modal/Modal'
function LandingPage() {
    const [sort,setSort]=useState('asc')
    const [filterIsVisible,setFilterIsVisible]=useState(false)
    
    return (
        <>
        <div className="container">
        <Modal filterIsVisible={filterIsVisible} setFilterIsVisible={setFilterIsVisible} />
            <div className="label">
                [2021-05-10]윤재진
            </div>
            
            <div className="content" >

                <button  className="loginButton">
                    로그인
                </button>

                <div className="board">

                    <div className="sort">
                        <div className="sortcontainer">
                            <div onClick={()=>setSort('asc')}>
                                <div className="led" style={{backgroundColor:sort==="asc"&&'#00c854'}}></div>오름차순
                            </div>
                            <div onClick={()=>setSort('desc')}>
                                <div className="led" style={{backgroundColor:sort==="desc"&&'#00c854'}} ></div>내림차순
                            </div>
                        </div>
                        <div onClick={()=>setFilterIsVisible(!filterIsVisible)} className="filter">
                            필터
                        </div>
                    </div>
                    
                   
                   <div className="overflowDiv"  >

                        {/* 개시물 */}
                        <NoticeContent/>
                        {/* 광고 */}
                        <Ad/>
                      
                   </div>
                   
                </div>

            
            </div>
        </div>
        </>
    )
}

export default LandingPage

