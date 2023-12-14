import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as client from "./client";

function Test() {
  const [books, setBooks] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await client.findAllBooks();
      setBooks(books);
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const randomSelection = books.sort(() => Math.random()).slice(0, 4);
    setRandomBooks(randomSelection);
  }, [books]); 

  return (
    <div className="mt-2">
      <h4>Featured Books</h4>
      <div>
        <div className="row d-flex justify-content-start flex-wrap">
          {randomBooks.map((book) => (
            <div
              key={book._id}
              className="col-auto ms-5 mt-2"
              style={{ width: "280px" }}
            >
              <div className="h-100">
                <div
                  style={{
                    backgroundImage: `url(${book.coverImage})`,
                    backgroundSize: "70%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "250px",
                  }}
                ></div>
                <div className="bg-body-tertiary">
                  <Link to={`../book/${book._id}`} className="text-decoration-none">
                    <h5 className="card-title">{book.name}</h5>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Test;
