import React, { useEffect, useState } from 'react'

const ImplementSearch = () => {
  const [input, setinput] = useState("")
  const [data, setdata] = useState([])

  const handleChange = (e)=>{
    setinput(e.target.value);
  }

  const fetchApi = async(query)=>{
    if(!query) return;

    try{
      const res = await fetch(`https://api.frontendeval.com/fake/food/${input}`)
      const data = await res.json();
      setdata(data)
    }catch(err){
      console.log('error in fetching' , err); 
    }
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      fetchApi(input)
    },500)

    return ()=>{
      clearTimeout(timer)
    }
  },[input])
  return (
    <>
      <h1 className='text-center font-bold text-2xl'>Debouce Functionality</h1>
      <div className='w-screen justify-center flex mt-10'>
      
      <div className='flex flex-col'>
        <input value={input} type="text" className='border-2 px-1 py-2 text-xl'
        onChange={handleChange} />
       { data.length ?<div className='w-[400px] h-[200px] overflow-scroll overflow-x-hidden border-2 mt-2 px-2'>
          {data.map(curr=>{
            return <p>{curr}</p>
          })}
        </div>:""}
      </div>
    </div>
    </>
  )
}

export default ImplementSearch