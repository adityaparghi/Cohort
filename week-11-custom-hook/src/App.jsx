import { useState } from 'react'


function useCounter(){ //Let's try to encapsulate some logic inside the custom hook
  const [count, setCount] = useState(0);

  function increaseCount(){
    setCount(count+1);
  }

  return{
    count:count,
    increaseCount: increaseCount
  }
}

function App() {
  const {count, increaseCount} = useCounter();

  return (
    <div>
        <button onClick={increaseCount}>Increase {count}</button>
    </div>
  )
}

export default App
