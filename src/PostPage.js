import './App.css';
import parse from 'html-react-parser';
import {useParams} from "react-router-dom";
import { useState, useEffect, useCallback } from 'react';
import Comment from './Comment';




const PostPage = () => {
    let { postid } = useParams();
    let postUrl = `https://my-blog-api-44oj.onrender.com/blogapp/new-comment/${postid}/`


    const [post, setPost] = useState({});
    const [postText, setPostText] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState()

  
    const getPosts = async (calledFrom = 'function') => {
      await fetch(`https://my-blog-api-44oj.onrender.com/blogapp/post-page/${postid}/`, {
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
            setPost(data[0].fields)
            setPostText(parse(data[0].fields.text))
            console.log(data[0].fields.text)
          })
  
       // parses JSON response into native JavaScript objects
      
    }
   /** const getComments = async (calledFrom = 'function') => {
      await fetch(`http://localhost:8000/blogapp/comments/${postid}/`, {
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
            console.log(data[0].fields)
            setComments(data)
          })
  
       // parses JSON response into native JavaScript objects
      
    }*/ 
    const getComments = useCallback(async () => {
      await fetch(`https://my-blog-api-44oj.onrender.com/blogapp/comments/${postid}/`, {
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
            console.log(data[0].fields)
            setComments(data)
          })
    })

    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
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
    getComments("useEffect");


  }, [])

  const postComment = (e) => {
    e.preventDefault();
    postData(postUrl,{text: newComment}).then(data =>{})
    getComments();
    setNewComment('');
    
    
    
}



    return (
      <div className='post-page'>
        <div className="banner-img">
            <h1>B L O G O L O G Y</h1>
          </div>
        <div className='post'>
          <a href ='/blog-app/' id='back-button' ><button>Back</button></a>
          <div className='post-body'>
            <div className='img-container'>
              <img src={post.imgUrl}/>
            </div>
            <h1>{post ? post.author_name :"Loading..."}</h1>
            <h1>{post.date_formatted}</h1>
            <h1 className='post-title'>{post.title}</h1>
            <div className='post-text'>{postText}</div>
          </div>

          <div className='comments'>
            <h1>Comments</h1>
          <div className='new-comment'>
            <form action={postUrl} method='post'>
              <input type='text' name='text' placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)}></input>
              <button onClick={postComment}>Comment</button>
            </form>
          </div>
          {comments.map((comment) => {
                return <Comment
                  date={formatDate(comment.fields.date)}
                  text={comment.fields.text}
                />;
                
              })}
          </div>
          
        
        </div>
        <footer><p>Designed and Developed by Tanzeem Xhidori &copy; Copyright 2022</p></footer>
      </div>
    );
  };
  
  export default PostPage;