import { useEffect, useState } from "react";
import { PostComponent } from "./Post";

function App() {
  const[posts, setPosts] = useState([]);
  const[currentTab, setCurrentTab] = useState(1);
  const[loading, setLoading] = useState(false);
  const[tabData, setTabData] = useState({});

  const postComponents = posts.map(post => <PostComponent
    name={post.name}
    subtitle={post.subtitle}
    time={post.title}
    image={post.image}
    description={post.description}
  />)

  function addPost() {
    setPosts([...posts, {
      name: "Aditya",
      subtitle: "10000 followers",
      time: "2m ago",
      image: "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
      description: "What to know how to win big? Check out how these folks won $6000 in bounties."
    }])
  }

  function removePost(){
    setPosts(posts.slice(0, -1));
  }

  useEffect(function(){
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/todos/"+currentTab).
    then(async res => {
      const json = await res.json();
      setTabData(json);
      setLoading(false);
    })

  },[currentTab])

  return (
    <div style={{background: "#dfe6e9", height: "100vh", }}>
      <div style={{display:"flex", gap:"10px"}}>
        <button onClick={addPost}>Add post</button>
        <button onClick={removePost}>Remove Post</button>
        <button>Tabs management {"-->"}</button>

        <button onClick={() => setCurrentTab(1)}
        style={{color: currentTab == 1 ? "red" : "black" }} >Todo1</button>

        <button onClick={() => setCurrentTab(2)} 
        style={{color: currentTab == 2 ? "red" : "black" }}>Todo2</button>
        <button onClick={() => setCurrentTab(3)} 
        style={{color: currentTab == 3 ? "red" : "black" }}>Todo3</button>
        <button onClick={() => setCurrentTab(4)} 
        style={{color: currentTab == 4 ? "red" : "black" }}>Todo4</button>
      </div>

      <div style={{display: "flex", justifyContent: "center" }}>
        <div>
          {postComponents}{/*Array of react elements*/}
        </div>
      </div>
      {loading ? "Loading...." : tabData.title} 
    </div>
  )
}

export default App

