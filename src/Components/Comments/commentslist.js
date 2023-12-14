import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { findCommentByUserId} from "./client";
import { FaBook } from "react-icons/fa";


function CommentsList() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const userData = localStorage.getItem("currentUser");
  const userObj = userData ? JSON.parse(userData) : null;
  const [user, setUser] = useState(userObj);

  const [comments, setComments] = useState([]);

  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setAccount(user);
  };

  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
  };

  const fetchCommentByUserId = async () => {
    try {
      const userComments = await findCommentByUserId(user._id);
      setComments(userComments)
    } catch (err) {
      console.log(err);
    }
  }


  useEffect(() => {
    if (user) {
      findUserById(user?._id);
      fetchCommentByUserId();
    } else {
      fetchAccount();
    }
  }, [id]);

  return (
    <div className="container mt-5">

      <br></br>
      {account && user?._id === account?._id && (
      <div className="d-flex align-items-center justify-content-center">
        <table className="table mx-auto">
              <thead>
                <tr>
                  <td className = "tableHeaderStyle">Book</td>
                  <td className = "tableHeaderStyle">Comment</td>
                  <td className = "tableHeaderStyle">Time</td>
                  
                </tr>
              </thead>
              <tbody>
              {comments.map((object) => (
                <tr key ={object?._id} >
                  <td>
                  <a href={`/book/${object.bookId}`} className="btn btn-primary">
                   <FaBook /> Book Detail
                  </a>
                  </td>
                  <td>
                    {object.comment} 
                  </td>
                  <td>
                    {object.timestamp}
                  </td>
                </tr>
                
              ))}
              </tbody>
            </table>
          </div>
          )}

          {user === null && (
          <div>
          Please <a href="/signin">log in</a> to see your recent reviews. 
          </div>
          
          )}

      
      
      

    </div>
  );
}

export default CommentsList;
