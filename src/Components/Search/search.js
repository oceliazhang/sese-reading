import React, { useState, useEffect } from "react";
import Card from "./card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBook() {
  const [search, setSearch] = useState("");
  const [bookData, setBook] = useState([]);
  const [randomBooks, setRandomBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBookData = JSON.parse(localStorage.getItem("bookData"));
    if (storedBookData) {
      setBook(storedBookData);
    }
    const storedSearch = localStorage.getItem("search");
    if (storedSearch) {
      setSearch(storedSearch);
    }    
    fetchRandomBooks();
  }, []);

  const fetchRandomBooks = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=random&maxResults=20"
      )
      .then((res) => {
        const randomBooksData = res.data.items;
        const selectedRandomBooks = getRandomBooks(randomBooksData, 6);
        setRandomBooks(selectedRandomBooks);
      })
      .catch((error) => {
        console.error("Error fetching random books:", error);
      });
  };

  const getRandomBooks = (books, count) => {
    const shuffledBooks = books.sort(() => 0.5 - Math.random());
    return shuffledBooks.slice(0, count);
  };


  const searchBook = (e) => {
    if (search.trim() !== "") {
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyASI4McIODQ9y7FRxRndxEWy3R-gqKYDi8" +
            "&maxResults=40"
        )
        .then((res) => {
          const newBookData = res.data.items;
          setBook(res.data.items);
          console.log(res.data.items);
          localStorage.setItem("bookData", JSON.stringify(newBookData));
          localStorage.setItem("search", search);
          navigate(`/search/${search}`);
        });
    } else {
      alert("Please enter a book name before searching.");
    }
  };

  const handleSearchInputChange = (e) => {
    const inputText = e.target.value;
    setSearch(inputText);

    if (inputText.trim() === "") {
      setBook([]);
      localStorage.removeItem("bookData");
      localStorage.removeItem("search");
      navigate(`/search`);
    }
  };

  return (
    <div className="mt-3">
      <h3>Find Your Book!</h3>
      <div className="d-flex align-content-center justify-content-center mt-4">
        <input
          type="text"
          className="form-control w-50 border border-secondary"
          placeholder="Enter Your Book Name"
          value={search}
          onChange={handleSearchInputChange}
        />
        <div className="">
          <button
            className="btn btn-outline-primary ms-1"
            style={{ width: "5rem", height: "3rem" }}
            onClick={searchBook}
          >
            Search
          </button>
        </div>
      </div>
     <div className="d-flex flex-row flex-wrap row row-cols-auto mt-2 ms-5">
        {bookData.length > 0 ? (
          <Card book={bookData} />
        ) : (
          <Card book={randomBooks} />
        )}
      </div>
    </div>
  );
}

export default SearchBook;
