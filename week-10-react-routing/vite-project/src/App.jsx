
import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ErrorPage } from './ErrorPage';

function App() {

  return <div>
    <BrowserRouter>
      <Link to="/">Allen</Link>
      | 
      <Link to="/neet/online-coaching-class-11">Class 11</Link> 
      | 
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
      <Routes>
        <Route path="/neet/online-coaching-class-11" element={<Class1Program />} />
        <Route path="/neet/online-coaching-class-12" element={<Class2Program />} />
        <Route path="/" element={<Landing />} />
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </BrowserRouter>
  </div>
}

function Landing() {
  return <div>
    Welcome to fallen
  </div>
}

function Class1Program() {
  return <div>
      Flerk programs
  </div>
}

function Class2Program() {
  return <div>
      Dork programs
  </div>
}

export default App
