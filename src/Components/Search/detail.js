import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const { bookId } = useParams();
  const [bookDetails, setBookDetails] = useState(null);
  useEffect(() => {
    // Fetch book details using the bookId
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((res) => {
        setBookDetails(res.data);
      });
  }, [bookId]);

  if (!bookDetails || !bookDetails.volumeInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <h3>Book Detail</h3>
      <div className="row mt-4">
        <div className="col-md-4">
          <img
            src={bookDetails.volumeInfo.imageLinks.thumbnail}
            alt={bookDetails.volumeInfo.title}
            className="img-fluid mt-3"
          />
          <div className="mt-5">
            <h4>Title: {bookDetails.volumeInfo.title}</h4>
            <p>Author: {bookDetails.volumeInfo.authors.join(", ")}</p>
            <p>Published Date: {bookDetails.volumeInfo.publishedDate}</p>
          </div>
          <div className="w-50 mt-4 ms-5">
            <Link to={bookDetails.volumeInfo.previewLink} className="text-decoration-none">
              <button className="w-100 rounded-3">Read the Book</button>
            </Link>
          </div>
          <div className="w-50 mt-3 ms-5">
            <Link to="/search" className="text-decoration-none ">
              <button className="w-100 rounded-3">Back to Search</button>
            </Link>
        </div>
        </div>
  
        <div className="col-md-8">
          <div>
            <small>{bookDetails.volumeInfo.description}</small>
          </div>
        
        </div>
      </div>
    </div>
  );
  
}

export default Detail;
