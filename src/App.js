import './App.css';
import Post from './Post';
import { useState, useEffect } from 'react';

function App(props) {

  const [posts, setPosts] = useState([]);

  
  const getPosts = async (calledFrom = 'function') => {
    await fetch('https://immense-meadow-31946.herokuapp.com/posts', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }).then(response => response.json())
        .then(data => {
          setPosts(data.posts_list)
          console.log(data)
        })
  
       // parses JSON response into native JavaScript objects
      
    }
  
    


  useEffect(() => {
    getPosts("useEffect");

  }, [])
  
 





  

  return (
    <div className="App">
      <div className="header">
        <h1>blogology</h1>
      </div>
      <div className='posts'>
        {posts.map((post) => {
              return <Post
                author={post.author.first_name + ' ' + post.author.last_name}
                date={post.date_formatted}
                title={post.title}

                img={post.imgUrl}
                url={post.url}
              />;
            })}
      </div>
      <footer><p>Designed and Developed by Tanzeem Xhidori &copy; Copyright 2022</p></footer>
    </div>
  );
}

export default App;
