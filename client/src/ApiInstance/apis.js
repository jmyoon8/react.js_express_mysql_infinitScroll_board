import axios from 'axios'

export const api=axios.create({
    baseURL:'https://problem.comento.kr/api',
    headers:{
        'Content-Type': 'application/json',
    }
        
    

})