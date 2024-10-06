import React, { useEffect, useState } from 'react'

const GridLigths = () => {
  const config = [
    { id: 1, isBox: true, isChecked: false }, 
    { id: 2, isBox: true, isChecked: false }, 
    { id: 3, isBox: true, isChecked: false },
    { id: 4, isBox: true, isChecked: false }, 
    { id: 5, isBox: false, isChecked: false }, 
    { id: 6, isBox: true, isChecked: false },
    { id: 7, isBox: true, isChecked: false }, 
    { id: 8, isBox: true, isChecked: false }, 
    { id: 9, isBox: true, isChecked: false }
  ]

  const [boxes, setboxes] = useState(config);
  const [queue, setqueue] = useState([])
  const [deactivate, setdeactivate] = useState(false)
  const handleClick = (id)=>{
    setboxes(prev=> prev.map((curr)=> curr.id === id ?{...curr , isChecked:true}:curr))


    let newOrder = [...queue]
    if(!newOrder.includes(id)){
      newOrder = [...queue , id]
    }
    
    if(newOrder.length === 8) setdeactivate(true)
    setqueue(newOrder) 

  }

  useEffect(()=>{
    let idx = queue.length-1
    if(deactivate){
      let timer = setInterval(()=>{
        const idtoreset = queue[idx]
        if(idx>=0){
          setboxes(prev => prev.map(curr=> curr.id === idtoreset?{...curr , isChecked:false}:curr))
          idx--;
        }

        else{
          clearInterval(timer)
          setqueue([]);
          setdeactivate(false);
        }
      },300)
    }
  } ,[deactivate])
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='grid grid-cols-3 gap-3'>
        {boxes.map(({id , isBox , isChecked})=>{
          return isBox ? <div key={id} className={'h-[100px] w-[100px] cursor-pointer border-2 border-black ' + (isChecked === true?"bg-green-700":"")}
          onClick={()=> handleClick(id)}></div>
          :<span key={id}></span>
        })}
      </div>
    </div>
  )
}

export default GridLigths