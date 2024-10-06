import React, { useState } from 'react'
import { data } from '../utils/data'

const List = () => {
  const [left, setleft] = useState(data)
  const [right , setright] = useState([]);
   console.log(left ,right);
  
  const handleSelect = (id , dir)=>{
    if(dir === 'left'){
      setleft(prev => prev.map(curr => curr.id === id?{...curr , checked: !curr.checked}:curr))
    }else{
      setright(prev => prev.map(curr => curr.id === id?{...curr , checked: !curr.checked}:curr))
    }
  }
  const reset = (list)=>{
    return list.map((curr)=>{
      return {...curr  , checked:false}
    });
  }
  const handleTransfer = (dir)=>{
    if(dir ==='ltr'){
    let leftItems = [...left];
    leftItems = leftItems.filter(curr => curr.checked === true);
    setright(prev => reset([...prev , ...leftItems]))
    setleft(prev => prev.filter(curr => curr.checked === false))
    }else{
      let righItems = [...right];
      righItems = righItems.filter(curr => curr.checked === true)
      setleft(prev=> reset([...prev , ...righItems]));
      setright(prev => prev.filter(curr => curr.checked === false));
    }
  }
  return (
    <div className='w-screen'>
      <h1 className='font-bold text-center text-2xl'>Transfer List</h1>
      <div className='w-full flex gap-10 justify-center mt-10'>
          <div className='h-[200px] w-[200px] flex flex-col  border-2'>
            {left.map(({title , id , checked } )=>(
               <>
                <button onClick={()=>handleSelect(id, 'left')} key={id}  className={`border-2 m-2 bg-purple-200 ${checked?"bg-violet-300":"bg-blue-200"}` }>{title}</button>
  
               </>
            ))}
          </div>
          <div className='flex flex-col gap-2 justify-center'>
            <button className='border-2 px-4 font-bold text-lg rounded-xl' onClick={()=> handleTransfer('ltr')}>left</button>
            <button className='border-2 px-4 font-bold text-lg rounded-xl'onClick={()=> handleTransfer('rtl')} >Right</button>
          </div>
          <div className='h-[200px] w-[200px] flex flex-col border-2'>
          {right.map(({title , id , checked })=>(
               <button key={id} onClick={()=>handleSelect(id, 'right')} className={`border-2 m-2 bg-purple-200 ${checked?"bg-violet-300":"bg-blue-200"}` }>{title}</button>
            ))}
          </div>
      </div>
    </div>
  )
}

export default List