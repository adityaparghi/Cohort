import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <LightBulb />
    </>
  )
}

function LightBulb(){
  return<div>
    <BulbState />
    <ToggleBulbState />
  </div>
}

function BulbState(){
  const [bulbOn, SetBulbOn] = useState(true); // this state variable we defined here we need in ToggleBulbState function 
  return <div>
    {bulbOn ? "Bulb is On" : "bulb is off"}
  </div>
}

function ToggleBulbState(){ // here we need it so we pass the state to LCA & can we lift up the state to child to parent
  return <div> 
    <button>Toggle Bulb</button> 
  </div>
}

export default App
