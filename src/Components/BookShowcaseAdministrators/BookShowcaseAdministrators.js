import React from 'react';
import './BookShowcaseAdministrators.css'; // Make sure to have the CSS file in the same directory

function BookShowcaseAdministrators() {
  // This is a mock data array to simulate fetching book data
  const books = [
    { id: 1, name: 'Book Name', intro: 'Book Intro', image: 'https://source.unsplash.com/random/300x200', tags: 'tags' },
    { id: 2, name: 'Another Book', intro: 'Another Intro', image: 'https://source.unsplash.com/random/300x200', tags: 'more tags' },
    { id: 3, name: 'Third Book', intro: 'Third Book Intro', image: 'https://source.unsplash.com/random/300x200', tags: 'even more tags' },
  ];

  // Define the handleBlockClick function within the component
  const handleBlockClick = (bookId) => {
    // Implement what should happen when the block button is clicked
    console.log(`Book with ID ${bookId} has been blocked.`);
    // You might want to set state here or perform other actions
  };

  return (
    <div className="book-showcase">
      <header>
        <input type="search" placeholder="Search here..." />
      </header>
      <button className="writer-button" onClick={() => { /* logic to go to writer page */ }}>
        Go to writer page
      </button>

      <section className="recommendation">
        <h2>Recommendation 👍👍👍👍</h2>
        {books.map((book) => (
          <article key={book.id} className="book-item">
            <img src={book.image} alt="Book" className="book-image" />
            <div className="book-info">
              <h3>{book.name}</h3>
              <p>{book.intro}</p>
              <p>{book.tags}</p>
              <button className="block-button" onClick={() => handleBlockClick(book.id)}>
              Handle Block Click
              </button>
            </div>
          </article>
        ))}
      </section>


      <section className="whats-new">
        <h2>What's New 📚</h2>
        <div className="book-row">
          {/* Repeat for each new book */}
          <div className="book">
            <img src="https://source.unsplash.com/random/100x100" alt="New Book" />
            <span>Book name</span>
          </div>
        </div>
      </section>

      <h2 className="ranking-title">Ranking List 🏆</h2>
      <section className="ranking-list">
  <div className="book-row">
    {/* Repeat for each book */}
    <div className="book">
      <img src="https://source.unsplash.com/random/100x100" alt="Ranked Book"/>
      <span>Book name</span>
    </div>
  </div>
</section>






    </div>
  );
}

export default BookShowcaseAdministrators;