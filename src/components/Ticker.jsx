import React, { useEffect, useState } from 'react'

const Ticker = () => {
  const [isStart, setisStart] = useState(false);
  const [value , setvalue] = useState(0)
  const handleClick = ()=>{
    setisStart(!isStart)
  }

  useEffect(()=>{
    let timer
    if(isStart){
       timer = setInterval(()=>{
        setvalue(prev=> prev+1)
      },1000)
    }
    return ()=>{
      clearInterval(timer)
    }
  },[isStart])
  return (
    <div className='w-screen'>
      <h1 className='font-bold text-2xl text-center'>Ticker</h1>

      <div className='w-full flex justify-center items-center flex-col mt-6 '>
        <h1 className=' font-bold text-2xl'>{value}</h1>
        <button className='border-2 mt-4 p-2 text-lg font-bold'
        onClick={handleClick}> {isStart?"Stop":"Start"}</button>
      </div>
    </div>
  )
}

export default Ticker