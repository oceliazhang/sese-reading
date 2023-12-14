import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

function Card({ book }) {
  console.log(book);

  return (
    <>
      {book.map((item) => {
        let thumbnail =
          item.volumeInfo.imageLinks &&
          item.volumeInfo.imageLinks.smallThumbnail;
        if (thumbnail != undefined && item.volumeInfo.authors != undefined) {
          return (
            <div
              key={item.id}
              className="d-flex flex-row flex-wrap row row-cols-auto mt-2 ms-3"
            >
              <div className="col mt-2 mb-4 " style={{ width: "270px" }}>
                <div
                  className="card h-100 shadow-lg rounded bg-warning-subtle"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="mt-3"
                    style={{
                      height: "180px",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img src={thumbnail} alt="" />
                  </div>
                  <div className="card-body">
                    <h6
                      className="card-title text-truncate text-decoration-none d-inline-block text-dark"
                      style={{
                        width: "200px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.volumeInfo.title}
                    </h6>
                    <div
                      className="card-text text-truncate text-decoration-none d-inline-block text-dark"
                      style={{
                        width: "200px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <small>Author: {item.volumeInfo.authors}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <Link to={`/detail/${item.id}`}>
                      <button className="btn btn-outline-primary w-75">
                        <div className="fs-6">More Info</div>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

export default Card;
