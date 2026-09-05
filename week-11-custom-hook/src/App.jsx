import { useState } from "react";
import { usePrev } from "./hooks/use-Prev";

function App() {
  const[state, setState] = useState(0);
  const prev = usePrev(state);

  return (
    <div>
      <p>Current State {state}</p>
      <button onClick={() => setState(c => c + 1)}>Click me</button>
      <p>The previous value was {prev}</p>
    </div>
  )
}

export default App
