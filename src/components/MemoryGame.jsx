import React, { useEffect, useState } from 'react'

const getNums = () => {
  let nums = [];
  for (let i = 0; i < 8; i++) {
    nums.push(i);
  }

  return [...nums, ...nums]
}

const MemoryGame = () => {
  const [stage, setstage] = useState('init')
  // console.log(stage);
  
  const [initial, setinitial] = useState(getNums());
  const [clicked, setclicked] = useState([])
  const [solved, setsolved] = useState([])
  // console.log(initial);
  // console.log('clicked' , clicked);
  // console.log('solve' , solved);
  

  const makeRandom = () => {
    setinitial(prev => prev.sort(() => Math.random() - 0.5))
  }

  const handleStage = () => {
    setstage('start')
    setsolved([]);
    makeRandom();
  }

  const handleClick = (num, indx) => {
    if (clicked.length === 2) return;
    setclicked(prev => [...prev, indx])

  }

  useEffect(() => {
    if (clicked.length === 2) {
      setTimeout(() => {
        const num1 = initial[clicked[0]];
        const num2 = initial[clicked[1]];

        if (num1 === num2) {
          setsolved(prev=> [...prev , ...clicked])
        }
        setclicked([]);
      }, 1000)


    }
  }, [clicked , initial])

  useEffect(()=>{
    if(solved.length === 16){
      console.log('enter');
      setstage('end')
    }
  },[solved])
  return (
    <div className='w-screen'>
      <h1 className='font-bold text-3xl text-center'>Memeory Game</h1>
      {stage === 'init' && <div className='w-full flex  items-center flex-col'>

        <button className='font-bold mt-4 text-xl px-5 py-2 rounded-lg bg-blue-300 text-white'
          onClick={handleStage}>
          Play Game
        </button>
      </div>}

      {stage === 'start' && 
      <div className='w-full flex justify-center mt-6'>
        <div className='grid grid-cols-4 gap-1'>
          {initial.map((curr, indx) => (
            <div className={`w-[100px] h-[100px]  flex justify-center items-center cursor-pointer bg-purple-300 text-white text-xl font-bold ${solved.includes(indx)?"invisible":"block"}`
              
            } key={indx}
              onClick={() => handleClick(curr, indx)}>
              <p className={clicked.includes(indx)?"block":"invisible"}>{curr}</p>
              
            </div>
          ))}
        </div>
      </div>}

      {stage === 'end' &&
        <div className='w-full flex justify-center mt-6'>
          <button className='font-bold mt-4 text-xl px-5 py-2 rounded-lg bg-blue-300 text-white'
          onClick={handleStage}>Play Again</button>
        </div>
      }
    </div>
  )
}

export default MemoryGame