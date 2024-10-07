import React, { useEffect, useState } from 'react'

const TicTacToe = () => {
  const og = Array(9).fill(null);
  const [squares, setsquares] = useState(og);
  const [isNext, setisNext] = useState(true)
  const [status , setstatus] = useState("")
  console.log(squares);

  const calculateWinner = (squares) => {
    const line = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < line.length; i++) {
      const [a, b, c] = line[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  }


  useEffect(()=>{
    const winner = calculateWinner(squares);
    if(winner){
      setstatus("Winner: " + winner);
    }else{
      setstatus("Next Player "  + (isNext?"X" :"O"))
    }
  },[isNext , squares])


  const handleClick = (idx) => {
    if (squares[idx] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    if (isNext) {
      nextSquares[idx] = "X";
    } else {
      nextSquares[idx] = "O";
    }

    setisNext(!isNext);
    setsquares(nextSquares)

  }

  const handleReset = () => {
    setsquares(og)
    setisNext(true)
  }

  return (
    <div className='w-screen h-screen'>
      <h1 className='text-center font-bold text-2xl'>Tic-Tac-Toe</h1>
      <h1 className=' text-center font-bold text-4xl mt-10'>{status}</h1>

      <div className='w-full flex justify-center mt-10 '>


        <div className='grid grid-cols-3 gap-4 '>
          {squares.map((curr, indx) => {
            return <div key={indx} className='w-[100px] h-[100px] border-2 border-black cursor-pointer  flex justify-center items-center'
              onClick={() => handleClick(indx)}>
              <h1 className='font-bold text-4xl'>{curr}</h1>
              {/* {indx} */}
            </div>
          })}
        </div>
      </div>

      <div className='w-full flex justify-center mt-10'>
        <button className='border-2 px-4 font-bold text-lg rounded-xl bg-purple-400 text-white' onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default TicTacToe