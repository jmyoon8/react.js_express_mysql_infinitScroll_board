import React, { useEffect } from 'react'
import { useState } from 'react'
import { api } from '../../../../ApiInstance/apis'
import '../../../CSSS/modal.css'


function Modal(props) {
    const {filterIsVisible,setFilterIsVisible}=props
    const [category,setCategory]=useState([])
    

    const categoryHandler =()=>{
        let categorys=[]
        let cate=document.getElementsByName('category')
        
        for(let i=0; i<cate.length;i++){
            if(cate[i].checked){
                categorys.push({category:cate[i].value})
            }
        }
        
        localStorage.setItem('category',JSON.stringify(categorys))


        let cutAds=document.getElementById('cutAds').checked
       

        if(cutAds){
            localStorage.setItem('checked',true)
        }else{
            localStorage.removeItem('checked')
        }

        setFilterIsVisible(!filterIsVisible)
    }
    
    useEffect(() => {
        api.get('/category').then(res=>{
            setCategory(res.data.category)
           
        })

    }, [])
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
                                {   

                                    category.map((value,index)=>{
                                        
                                        let checkCategory= JSON.parse(localStorage.getItem('category'))
                                        //로컬 스토리지에 category가 있는지 없는지 분기
                                        if(!checkCategory){
                                                return (
                                                    <div key={value.id}>
                                                        <input type="checkbox" id={value.id} name="category" defaultChecked  defaultValue={value.id} /> 
                                                        <label htmlFor={value.id} >
                                                                {value.name}
                                                        </label>
                                                    </div>
                                                )
                                        }else{
                                                for(let i =0; i<checkCategory.length;i++){
                                                    if(checkCategory[i].category===value.id.toString()){
                                                        return(
                                                        <div key={value.id}>
                                                            <input type="checkbox" id={value.id} name="category" defaultChecked   defaultValue={value.id} />
                                                            <label htmlFor={value.id} >
                                                                {value.name}
                                                            </label>
                                                        </div>
                                                        )
                                                    }
                                                }
                                                return (
                                                    <div key={value.id}>
                                                        <input type="checkbox" id={value.id} name="category"   defaultValue={value.id} /> 
                                                        <label htmlFor={value.id} >
                                                                {value.name}
                                                        </label>
                                                    </div>
                                                )
                                        }
                                    })
                                }
                                <div>
                                    <input type="checkbox" id="cutAds" defaultChecked={localStorage.getItem('checked')?true:false} defaultValue="cutAds"/> 
                                    <label htmlFor="cutAds" >
                                        광고가리기        
                                    </label>
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
