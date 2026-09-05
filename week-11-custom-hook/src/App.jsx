import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useEffect } from "react";

function App() {

  const [inputVal, setInputval] = useState("");
  const debounceVal = useDebounce(inputVal,200);

  function change(e){
    setInputval(e.target.value)
  }

  useEffect(() => {
    console.log("expensive operation")
  },[debounceVal])

  return (
    <div>
      <input type="text" onChange={change}></input>
    </div>
  )
}

export default App
