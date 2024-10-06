import React, { useState } from 'react'

const debounce = (fn , delay)=>{
  let timer;

  return (...args)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      fn.apply(this , args);
    },delay)
  }
}
const Debounce = () => {
  const [input, setinput] = useState("");
  const [debValue, setdebValue] = useState('')
  const handleChange = (e)=>{
    setinput(e.target.value);
    debounceHandleChange(e.target.value)
  }

  const debounceHandleChange = debounce((value)=>{
    setdebValue(value)
  } , 1000)
  return (
    <div>
      <input type="text" value={input} className='border-2  ml-4'
      onChange={handleChange}/>
      <p>Debouced Value:{debValue}</p>
    </div>
  )
}

export default Debounce