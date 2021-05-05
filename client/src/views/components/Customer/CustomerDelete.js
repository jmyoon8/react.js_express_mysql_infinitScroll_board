import React, { useState } from 'react'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from'@material-ui/core/Typography'
import Button from'@material-ui/core/Button'
import url from'../../../enum'

function CustomerDelete(props) {
    
    let reset=props.reset
    let setReset=props.setReset
    const [modalOpen,setModalOpen]=useState(false)
    const deleteCustomer=(id)=>{
        console.log(id)
        axios.delete(url+'api/customers/customerDelete/'+id).then(res=>{
            reset?setReset(false):setReset(true)
            console.log(res.data)
            setModalOpen(false)
        }).catch(err=>console.log(err))
    }

    return (

        <div>
            <Button variant="contained" color="secondary" onClick={()=>setModalOpen(true)}>
                삭제
            </Button>
            <Dialog open={modalOpen}>
                <DialogTitle>
                    삭제경고
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        선택한 고객의 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>deleteCustomer(props.id)}>
                        삭제하기
                    </Button>
                    <Button onClick={()=>setModalOpen(false)}>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
            
        </div>
    )
}

export default CustomerDelete
