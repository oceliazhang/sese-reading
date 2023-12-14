import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import BookCard from "../BookCard/Bookcard";
function BookList() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState({
    name: "new book",
    description: "new description",
    author: "author",
  });
  const [selectedBook, setSelectedBook] = useState(null);
  const fetchBooks = async () => {
    const books = await client.findAllBooks();
    setBooks(books);
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const createBook = async () => {
    try {
      const newBook = await client.createBook(book);
      setBooks([newBook, ...books]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = async () => {
    try {
      const status = await client.updateBook(book._id, book);
      setBooks(books.map((b) => (b._id === book._id ? book : b)));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBook = async (book) => {
    try {
      await client.deleteBook(book._id);
      setBooks(books.filter((b) => b._id !== book._id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="row d-flex justify-content-start flex-wrap">
        {books.map((book) => (
          <div
            key={book._id}
            className="col-auto ms-5 mt-4 mb-4"
            style={{ width: "280px" }}
          >
            <div className="card h-100">
              <div
                style={{
                  backgroundImage: `url(${book.coverImage})`,
                  backgroundSize: "70%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: "250px",
                  border: "1px solid #ddd",
                }}
              ></div>
              <div
                className="card-body bg-body-tertiary"
                style={{ height: "90px" }}
              >
                <Link to={`../book/${book._id}`}>
                  <h5 className="card-title mt-1">{book.title}</h5>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default BookList;
