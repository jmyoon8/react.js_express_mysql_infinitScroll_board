import axios from 'axios'
import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from'@material-ui/core/TextField'
import Button from'@material-ui/core/Button'
import url from'../../../enum'


function CustomerAdd(props) {

    const [userName,setUserName]=useState("")
    const [file,setFile]=useState("")
    const [fileName,setFileName]=useState("")
    const [birthday,setBirthday]=useState("")
    const [job, setJob]=useState("")
    const [gender,setGender]=useState("")
    const [modalOpen,setModalOpen]=useState(false)

    let reset=props.reset
    let setReset=props.setReset
    
    const nameHandler=(e)=>{
        setUserName(e.target.value)
    }
    const birthdayHandler=(e)=>{
        setBirthday(e.target.value)
    }
    const genderHandler=(e)=>{
        setGender(e.target.value)
    }
    const jobHandler=(e)=>{
        setJob(e.target.value)
    }
    const fileHandler=(e)=>{
        console.log(e.target.files[0])
        console.log(e.target.value)
        setFile(e.target.files[0])
        setFileName(e.target.value)
    }
    const submit= async (e)=>{
        e.preventDefault();
        //이미지를 전송하기 위해선 form데이터를 사용해야한다.
        const formData= new FormData();
        formData.append('image',file)
        formData.append('imageName',fileName)
        formData.append('name',userName)
        formData.append('birthday',birthday)
        formData.append('gender',gender)
        formData.append('job',job)
        //데이터 형식
        const config ={
            headers:{'content-type':'multipart/form-data'}
        }
        await axios.post(url+'api/customers/customerAdd',formData,config).then(res=>{
            console.log(res.data)
            //정보 추가제거
            reset?setReset(false):setReset(true)
            //정보 초기화
            setFileName("")
            setFile("")
            setUserName("")
            setBirthday("")
            setGender("")
            setJob("")
            setModalOpen(false)
        }).catch(err=>alert(err))
    }
    const modalHandler =(toggle)=>{
       setModalOpen(toggle)
    }
    return (
        <div >
            <Button variant="contained" color="primary" onClick={()=>modalHandler(true)}>고객추가</Button>
            <Dialog open={modalOpen}>
                <DialogTitle>고객추가</DialogTitle>
                <label htmlFor="raised-button-file">
                    <Button variant="contained" color="primary" component="span" >
                        {fileName===""?"프로필 이미지 선택":fileName}
                    </Button>
                </label>
                {/* 엑샙트속성을 통해 이미지 파일만 추가할 수있도록 한다. */}
                <input style={{display:'none'}} accept="image/*" id="raised-button-file" type="file" value={fileName} onChange={fileHandler}/> 
               
                <TextField label="이름" type="text" name="name" value={userName} onChange={nameHandler}/>
                <TextField label="생일" type="text" name="birthday" value={birthday} onChange={birthdayHandler}/>
                <TextField label="성별" type="text" name="gender" value={gender} onChange={genderHandler}/>
                <TextField label="직업" type="text" name="job" value={job} onChange={jobHandler}/>
                <DialogActions>
                    <Button onClick={submit}>추가</Button>
                    <Button onClick={()=>modalHandler(false)} >닫기</Button>
                </DialogActions>
            </Dialog>

        </div>
        // <div style={{display:'flex',justifyContent:"center",alignItems:'center',width:'100%'}}>
        //     <form onSubmit={submit}> 
        //         {/*사진에서는 value는 파일명 file은 파일의정보를 담고있다.  */}
        //         사진 : <input type="file" name="file" value={fileName} onChange={fileHandler}/> 
        //         이름 : <input type="text" name="name" value={userName} onChange={nameHandler}/>
        //         생일 : <input type="text" name="birthday" value={birthday} onChange={birthdayHandler}/>
        //         성별 : <input type="text" name="gender" value={gender} onChange={genderHandler}/>
        //         직업 : <input type="text" name="job" value={job} onChange={jobHandler}/>
        //         <button type="submit">추가하기</button>
        //     </form>            
        // </div>
    )
}

export default CustomerAdd
