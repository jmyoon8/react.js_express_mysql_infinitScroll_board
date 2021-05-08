export const debounce=(func, delay)=>{
    //제일 마지막 것만 실행이됨 계속 clearTimeout이되다가 마지막 펑션이 실행됬을때 그재야 setTime이됨
    let timeoutId=null
    return (...args)=>{
        clearTimeout(timeoutId)
        timeoutId=setTimeout(func.bind(null,...args),delay)
    }
}
