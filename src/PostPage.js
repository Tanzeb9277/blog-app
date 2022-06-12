import './App.css';
import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import Comment from './Comment';



const PostPage = () => {
    let { postid } = useParams();
    let postUrl = `https://immense-meadow-31946.herokuapp.com/${postid}/new-comment`


    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

  
    const getPosts = async (calledFrom = 'function') => {
      await fetch(`https://immense-meadow-31946.herokuapp.com/posts/${postid}`, {
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
            setPost(data.post)
            setComments(data.comments)
            console.log(data)
          })
  
       // parses JSON response into native JavaScript objects
      
    }
  
    


  useEffect(() => {
    getPosts("useEffect");

  }, [])



    return (
      <div className='post-page'>
        <div className="banner-img">
            <h1>B L O G O L O G Y</h1>
          </div>
        <div className='post'>
          
          <div className='post-body'>
            <div className='img-container'>
              <img src={post.imgUrl}/>
            </div>
            <h1>{post ? post.author && post.author.first_name + ' ' + post.author.last_name:"Loading..."}</h1>
            <h1>{post.date_formatted}</h1>
            <h1 className='post-title'>{post.title}</h1>
            <h1 className='post-text'>{post.text}</h1>
          </div>

          <div className='comments'>
            <h1>Comments</h1>
          <div className='new-comment'>
            <form action={postUrl} method='post'>
              <input type='text' name='text' placeholder='Write a comment...'></input>
              <button>Comment</button>
            </form>
          </div>
          {comments.map((comment) => {
                return <Comment
                  date={comment.date_formatted}
                  text={comment.text}
                />;
                
              })}
          </div>
          
        
        </div>
        <footer><p>Designed and Developed by Tanzeem Xhidori &copy; Copyright 2022</p></footer>
      </div>
    );
  };
  
  export default PostPage;