import "./bookcard.css";
import BookImage from "../BookImages/book-image.png";
import React, { useEffect, useState } from "react";
import * as client from "../books/client";
import { Link, useParams } from "react-router-dom";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill }
  from "react-icons/bs";
import axios from "axios";
import { findCommentByBookId, findAllComments, addComment } from "../Comments/client";
//import { findUserById } from "../users/client";
function BookCard() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);

  const userData = localStorage.getItem("currentUser");
  const userObj = JSON.parse(userData);
  const [user, setUser] = useState(userObj);
  const [comment, setComment] = useState({readerId: userObj?._id, bookId: bookId});
  // , readerName: userObj.name 
  const createComment = async () => {
    try {
      const newComment = await addComment(comment);
      setComments([newComment, ...comments]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCommentByBookId = async () => {
    try {
      const bookComments = await findCommentByBookId(bookId);
      setComments(bookComments)
    } catch (err) {
      console.log(err);
    }
  }

  const fetchBookDetails = async () => {
    try {
      const bookDetails = await client.findBookById(bookId);
      setBook(bookDetails);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };


  useEffect(() => {
    fetchBookDetails();
    fetchCommentByBookId();
  }, []);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 100); // Random number between 0 and 99
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="book-card">
      <div className="book-card-image-wrapper">
        <div className="book-card-header" key={book.id}>
          <img className="book-card-image" src={book.coverImage} alt="" />

          <div className="book-card-details">
            <h1 className="book-card-title">{book.name}</h1>
            <p className="card-text">
              Author: 
              <Link to={`/author/${book.author}`}>
                {book.authorName}
              </Link>
            </p >
            <div className="book-card-update">Update word count</div>
          </div>
        </div>
        <div className="book-card-buttons-and-text">
          <div className="button-and-text">
            <button className="image-button">
              🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Popularity
            </button>
            <div className="button-text">Weekly Click {getRandomNumber()}</div>
            <div className="button-text">Monthly Click {getRandomNumber()}</div>
          </div>
          <div className="button-and-text">
            <button className="image-button">
              🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reward
            </button>
            <div className="button-text">Weekly Click {getRandomNumber()}</div>
            <div className="button-text">Monthly Click {getRandomNumber()}</div>
          </div>
          <div className="button-and-text">
            <button className="image-button">
              🔥&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Comment
            </button>
            <div className="button-text">Weekly Click {getRandomNumber()}</div>
            <div className="button-text">Monthly Click {getRandomNumber()}</div>
          </div>
        </div>
        <div className="book-card-paragraphs">
          <p>
            <strong>Introduction</strong>
            <br />
            <span>{book.description}</span>
          </p>
          <div className="book-card-action-buttons">
          <button className="action-button">Start Reading</button>
          <button className="action-button">Add to book shelf</button>
        </div>
        <br></br>
          <p>
            <h4><strong>Leave Comment</strong></h4>
            <br />
            {user && (<div><div class="col">
              <input className="w-75 form-control"  
              defaultValue=""
              onChange={(e) => {
                e.preventDefault();
                setComment({ ...comment, comment: e.target.value })
                }}/>
              </div>
              <button className="w-75 action-button" onClick={createComment}>
                Submit
              </button></div>)}
            
            {user === null && (
              <div>
                Please <a href="/signin">log in</a> before adding comment. 
              </div>
            )}

              
            <div className="text-center">
              <br></br><br></br>
            <h3 className = "tableTitleStyle">Recent Comments</h3>
            <table className="table mx-auto">
              <thead>
                <tr>
                  <td className = "tableHeaderStyle">Comment</td>
                  <td className = "tableHeaderStyle">Time</td>
                </tr>
              </thead>
              <tbody>
              {comments.map((object) => (
                <tr key ={object?._id} >
                  <td>
                    {object.comment} 
                  </td>
                  <td>
                    {object.timestamp}
                  </td>
                  <td>
                    {object.readerId}
                  </td>
                  <td>
                    {object.bookId}
                  </td>
                </tr>
                
              ))}
              </tbody>
            </table>
          </div>
          </p>
        </div>

      </div>
      <div className="book-card-details"></div>
    </div>
  
  );
}

export default BookCard;
