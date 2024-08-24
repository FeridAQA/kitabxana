import React, { useEffect, useState } from 'react';
import './H_all.scss';
import config from '../../config';

function H_all() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/book?limit=12&offset=0`);
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Kitablar yüklənərkən xəta baş verdi:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
<h2>Son ktiablar</h2>
    <div className="all-books-container">
      {books.map((book) => (
        <div key={book._id} className="book-item">
          <img src={book.coverImage} alt={book.title} className="book-cover" />
          <div className="book-details">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author}</p>
            <p className="book-description">{book.description}</p>
            <p> $ {book.purchasePrice}</p>
            <div className="book-actions">
              <button className="btn btn-primary">View Details</button>
              <button className="btn btn-secondary">Add to Basket</button>
              <button className="btn btn-wishlist">Add to Wishlist</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>

  );
}

export default H_all;
