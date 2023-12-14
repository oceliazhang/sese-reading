import * as userClient from "../users/client";
import * as bookClient from "../books/client";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

function AuthorProfile() {
  const { author } = useParams();
  const [account, setAccount] = useState();
  console.log("author",author);
  const [works, setWorks] = useState([]);
  const navigate = useNavigate();

  const userData = localStorage.getItem("currentUser");
  const userObj = JSON.parse(userData);
  const [currUser, setUser] = useState(userObj);
  

  const findUserById = async (author) => {
    const user = await userClient.findUserById(author);
    console.log(user)
    setAccount(user);
    fetchAuthorWorks(user._id); // Assuming the user object has an _id property
  };


  const fetchAuthorWorks = async (author) => {
    const authorWorks = await bookClient.fetchBooksByAuthor(author);
    console.log(authorWorks)
    setWorks(authorWorks);
    console.log(works);
  };
;

  useEffect(() => {
    if (author) {
      findUserById(author);
    }
  }, []);


  return (
    <div className="container mt-5">
      <h1 className="text-center">Author Profile</h1>
      <div className="d-flex align-items-center justify-content-center">
        {account && currUser?._id && (
          <div className="card" style={{ width: "18rem" }}>
            <div className="card-body">
              <h5 className="card-title">Profile Information</h5>

              <label className="fw-bold">Author Name</label>
              <p className="card-text">{account.username}</p >
              <label className="fw-bold">Email</label>
              <p className="card-text">{account.email}</p >
              <label className="fw-bold">Works</label>
              <ul>
                {works.map((work, index) => (
                  <li key={index}>{work.name}</li> // Assuming the work object has a title property
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorProfile;
