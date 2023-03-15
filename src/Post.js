import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';


class Post extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='post-container'>

                <div className="post-info">
                    <div className='name-date'>
                        <h3>{this.props.date}</h3>
                        <h3 className='post-author'>{this.props.author}</h3>
                    </div>
                  
                    <h1 className='post-title'>{this.props.title}</h1>
                </div>

                <div class="post-img-container">
                    <img src={this.props.img}/> 
                </div>
                
                <Link to={"posts/" + this.props.url}>Read More</Link>
            </div>
        )
    }
}

export default Post;