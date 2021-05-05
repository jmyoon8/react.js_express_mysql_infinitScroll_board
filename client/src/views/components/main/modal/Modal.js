import React from 'react'



function Modal(props) {
    const {filterIsVisible,setFilterIsVisible}=props
    

    const categoryHandler =()=>{
        let categorys=[]
        let cate=document.getElementsByName('category')
        
        for(let i=0; i<cate.length;i++){
            if(cate[i].checked){
                categorys.push({category:cate[i].value})
            }
        }
        localStorage.setItem('category',JSON.stringify(categorys))

        setFilterIsVisible(!filterIsVisible)
        

    }
    return (
     
            <div className="modalOverlay" style={{display:filterIsVisible?"block":'none'}}>
                <div className="modalWrapper">
                    <div className="modalInner">

                        <div onClick={()=>setFilterIsVisible(!filterIsVisible)} className="x">
                            X
                        </div>
                        <div className="filter">
                            <div className="filterTitle">
                                필터
                            </div>
                            <div className="filterWrapper">
                                <div>
                                    <input type="checkbox" name="category"  defaultValue="category1" /> category_name
                                </div>
                                <div>
                                    <input type="checkbox" name="category" defaultValue="category1" /> category_name
                                </div>
                                <div>
                                    <input type="checkbox" name="category" defaultValue="category1" /> category_name
                                </div>
                            </div>
                        </div>
                        <button onClick={categoryHandler} className="button">
                            저장하기
                        </button>
                    </div>
                </div>
            </div>
     
    )
}


export default Modal
