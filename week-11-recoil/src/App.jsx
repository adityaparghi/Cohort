import { useState } from 'react'


function App() {


  return (
    <>
      <Counter />
    </>
  )
}

function Counter(){
  const [count, setCount] = useState(0)

  return <div>
    <CounterComponent count={count} />
    <Increase setCount={setCount} />
    <Decrease setCount={setCount} />
  </div>

}

function CounterComponent({count}){
  return<div>
    {count}
  </div>
}

function Increase({setCount}){

  return <button onClick={() => setCount(c=>c+1)}>
    Increase
  </button>
}

function Decrease({setCount}){
  return <button onClick={() => setCount(c=>c-1)}>
    Decrease
  </button>
}

export default App
