import React, { useEffect, useState } from 'react'

const Debounce2 = () => {

  const [input, setinput] = useState("")
  const handleChange = (e)=>{
    setinput(e.target.value);
  }

  const fetchApi = async(query)=>{
    if(!query) return;
    try{
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      console.log(data);
      

    }catch(err){
      console.error('api not found' , err)
    }
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      fetchApi(input);
    },500)

    return()=>{
      clearTimeout(timer)
    }
  },[input])
  return (
    <div>
      <input type="text" value={input} className='border-2 ml-4' 
      onChange={handleChange}/>

    </div>
  )
}

export default Debounce2

// 'https://dummyjson.com/products/search?q=phone'