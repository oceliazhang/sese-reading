import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { Link } from "react-router-dom";
import FeatureBooks from "../../Components/books/featureBooks";
import CommentsList from "../../Components/Comments/commentslist";
function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h3>Welcome to sese reading bookstore!</h3>
      </header>
      <div className="bg-body-tertiary">
        <div className="row mx-5">
          <div className="col-md-6 d-none d-md-block">
            <FeatureBooks />
          </div>
          <div className="col-md-6 d-block d-flex justify-content-center align-items-center">
            <div>
              <p className="text-center mb-5">
                "Uncover worlds within each page. From classics to contemporary
                tales, find your next adventure here. Every book has a story,
                and every story awaits you !"
              </p>
              <div className="w-50 mx-auto">
                <Link to="/bookshowcase" className="text-decoration-none ">
                  <button className="explore-button w-75 rounded-5">Explore All Books</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center">My Recent Reviews</h1>
      <CommentsList />
    </div>
  );
}

export default Home;
