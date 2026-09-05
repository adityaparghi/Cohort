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
  const [bulbOn, SetBulbOn] = useState(true);//if this changes Lightbulb will re-render and so does it's child so 3 re-render will happen but
  //react calculate the child the LightBulb component is the one whose state update triggered the render. During that render, React normally evaluates its child components too.

  return<div>
    <BulbState bulbOn={bulbOn} />
    <ToggleBulbState SetBulbOn={SetBulbOn} />
  </div>
}

function BulbState({bulbOn}){
  return <div>
    {bulbOn ? "Bulb is On" : "bulb is off"}
  </div>
}

function ToggleBulbState({SetBulbOn}){
  return <div> 
    <button onClick={() => SetBulbOn(c => !c)} >Toggle Bulb</button> 
  </div>
}

export default App
