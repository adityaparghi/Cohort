import { useState, useContext, createContext } from 'react'
import './App.css'

const BulbContext = createContext(); //Step 1 defined the context

function App() {
  const [bulbOn, SetBulbOn] = useState(true);

  return (
    <div>
      <BulbContext.Provider value={{ //Step 2 : Provide the value that you want to store
        bulbOn:bulbOn,
        SetBulbOn:SetBulbOn
      }}>
         <LightBulb />
      </BulbContext.Provider>

    </div>
  )
}

function LightBulb(){

  return<div>
    <BulbState/>
    <ToggleBulbState/>
  </div>
}

function BulbState(){
  const {bulbOn} = useContext(BulbContext); // Step 3 : Consume the context
  return <div>
    {bulbOn ? "Bulb is On" : "bulb is off"}
  </div>
}

function ToggleBulbState(){
  const {SetBulbOn} = useContext(BulbContext); //
  return <div> 
    <button onClick={() => SetBulbOn(c => !c)} >Toggle Bulb</button> 
  </div>
}

export default App
