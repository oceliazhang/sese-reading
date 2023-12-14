import React, { useState, useEffect } from "react";
import "./BookShowcase.css";
import * as client from "../books/client";
import { useNavigate } from "react-router-dom";

function BookShowcase() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await client.findAllBooks();
      setBooks(books);
    };

    fetchBooks();
  }, []);

  const viewBook = (book) => {
    navigate(`/book/${book._id}`);
  };

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearchQuery(inputText);

    if (inputText.trim() === "") {
      setSearchResults([]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      const results = books.filter((book) =>
        book.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  
  return (
    <div className="book-showcase">
      <div className="row d-flex mb-3">
        <div className="col-9">
          <input
            type="search"
            placeholder="Search here..."
            value={searchQuery}
             onChange={handleSearchInputChange}
          />
        </div>
        <div className="col-2">
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>


      <section className="recommendation">
        <h2>Recommendation 👍👍👍👍</h2>
        {searchResults.length > 0
          ? searchResults.map((book, index) => (
              <article key={index} className="book-item">
                <img src={book.coverImage} alt="Book" />
                <div className="book-info">
                  <h3>{book.name}</h3>
                  <p>{book.authorName}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      viewBook(book);
                    }}
                  >
                    View
                  </button>
                </div>
              </article>
            ))
          : books.map((book, index) => (
              <article key={index} className="book-item">
                <img src={book.coverImage} alt="Book" />
                <div className="book-info">
                  <h3>{book.name}</h3>
                  <p>{book.authorName}</p>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      viewBook(book);
                    }}
                  >
                    View
                  </button>
                </div>
              </article>
            ))}
      </section>
    </div>
  );
}

export default BookShowcase;
