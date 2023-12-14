import * as client from "../users/client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { findCommentByUserId} from "../Comments/client";
import { FaBook } from "react-icons/fa";
import CommentsList from "../../Components/Comments/commentslist";


function Profile() {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  const userData = localStorage.getItem("currentUser");
  //const userObj = JSON.parse(userData);
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
      <h1 className="text-center">Profile</h1>
      {account && user?._id === account?._id && (
      <div className="d-flex align-items-center justify-content-center">
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Account Information</h5>
              <label className="fw-bold">Username</label>
              <p className="card-text">{account.username}</p>
              <label className="fw-bold">Email</label>
              <p className="card-text">{account.email}</p>
              {/* Add other profile information as needed */}
              <div className="text-center mt-4">
                <Link to="/account" className="btn btn-primary">
                  Edit Information
                </Link>
              </div>
            </div>
          </div>
      </div>
      )}

      {user === null && (
        <div>
        Please <a href="/signin">log in</a> to see your account information. 
        </div>
        
      )}

      <br></br>
      <h1 className="text-center">My Recent Reviews</h1>
      {account && user?._id === account?._id && (
        <CommentsList />
          )}

          {user === null && (
          <div>
          Please <a href="/signin">log in</a> to see your recent reviews. 
          </div>
          
          )}

      
      
      

    </div>
  );
}

export default Profile;
