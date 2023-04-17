import './App.css';
import Post from './Post';
import { useState, useEffect } from 'react';
import React, { Suspense } from "react";

function App(props) {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const getPosts = async (calledFrom = 'function') => {
    await fetch('https://my-blog-api-44oj.onrender.com/blogapp/post-list', {
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
          setIsLoading(false);
          setPosts(data)
          
        })
  
       // parses JSON response into native JavaScript objects
      
    }
  
  function formatDate(postDate){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let d = new Date(postDate);
    let day = days[d.getDay()];
    let hr = d.getHours();
    let min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    let ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return(day + " " + hr + ":" + min + ampm + " " + date + " " + month + " " + year)
  } 
    


  useEffect(() => {
    getPosts("useEffect");

  }, [])
  
 
  function geiImage(text){
    let divToParse = document.createElement('div');
    divToParse.innerHTML = text;
    let img = divToParse.getElementsByTagName('img')
    
    return(img[0].src)
  }
  
    return (
      <div className="App">
        <div className="header">
          <h1>blogology</h1>
        </div>
        <div className='posts'>
          
        {isLoading ? <div> <h1>Don't worry I'm sure it'll load soon...</h1><img src='https://media1.giphy.com/media/Qt1jk5Q49C3h5CrlBe/giphy.gif?cid=ecf05e47yhx0zneh0tk43v768anrf00rjm4gfl5rga8j6fbc&rid=giphy.gif&ct=g'></img></div> : posts.map((post) => {
            
            return<Post
              author={post.fields.author_name}
              date={formatDate(post.fields.date)}
              title={post.fields.title}
              img={geiImage(post.fields.text)}
              url={post.pk}
            />;
            
          })}

              
        </div>
        <footer><p>Designed and Developed by Tanzeem Xhidori &copy; Copyright 2022</p></footer>
      </div>
    );
  }
  
  export default App;
