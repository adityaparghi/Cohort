import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom } from './store/count';


function App() {


  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  )
}

function Counter(){

  return <div>
    <CounterComponent />
    <Increase />
    <Decrease />
  </div>

}

function CounterComponent(){
  const count = useRecoilValue(counterAtom);
  return<div>
    {count}
  </div>
}

function Increase(){
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount(c=>c+1)}>
    Increase
  </button>
}

function Decrease(){
  const setCount = useSetRecoilState(counterAtom);
  return <button onClick={() => setCount(c=>c-1)}>
    Decrease
  </button>
}

export default App
