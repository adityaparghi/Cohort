import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{backgroundColor:'#dfe6e9', height:"100vh"}}>
      <div style={{display: "flex", justifyContent:'center'}}>
        <div>
          <div><PostComponent /><br /></div>
          <div><PostComponent /><br /></div>
          <div><PostComponent /><br /></div>
        </div>
      </div>
    </div>
  )
}

const style = { width:200, backgroundColor: "white", borderRadius: 10, borderColor: "gray", borderWidth: 1, padding:20 }

function PostComponent(){
    return <div style={style}> 
        <div style={{display:"flex"}}>
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQEa3XbCjS3AfA/profile-displayphoto-scale_400_400/B4DZ7WQfjGLAAg-/0/1781711109732?e=1789603200&v=beta&t=rqlucxpjzCgZqEGLAFZUaCc6pY9eMjbGa3MYuC2q29o"
            style={{
              width:30,
              height:30,
              borderRadius:20
            }}/>
            <div style={{fontSize:10, marginLeft:10}}>
                <b>Aditya Parghi</b>
                <div>500+ followers</div>
                <div>12m</div>
            </div>
        </div>
        <div style={{fontSize: 14}}>
            What to know and what not to no one knows so just enjoy the life
        </div>
    </div>
}

export default App
