import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as client from "../books/client";
//import BookCard from "../BookCard/Bookcard";
function BookAdmin() {
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
            style={{ width: "260px" }}
          >
            <div className="card h-100">
              <div
                style={{ backgroundColor: "#a183d7", height: "150px" }} 
              ></div>
              <div className="card-body">
                <Link to={`../book/${book._id}`}>
                  <h5 className="card-title">{book.name}</h5>
                </Link>

                <p className="card-text">
                  {book.name}
                  <br />
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      deleteBook(book);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      setBook(book);
                    }}
                  >
                    Edit
                  </button>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default BookAdmin;

/*
      <input
        value={book.name}
        className="form-control"
        onChange={(e) => setBook({ ...book, name: e.target.value })}
      />
      <input
        value={book.description}
        className="form-control"
        onChange={(e) => setBook({ ...book, description: e.target.value })}
      />
      <input
        value={book.author}
        className="form-control"
        onChange={(e) => setBook({ ...book, author: e.target.value })}
      />
      <hr />
      <button onClick={createBook}>Add</button>
      <button onClick={updateBook}>Update</button>
*/