import React, { useEffect, useState } from 'react';
import './H_all.scss';
import config from '../../config';

function H_all() {
  const [books, setBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(15); // İlk yükləmə üçün 15

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/book?limit=${limit}&offset=${offset}`);
        const data = await response.json();
  
        if (offset === 0) {
          setBooks(data);
        } else {
          setBooks(prevBooks => [...prevBooks, ...data]);
        }
        
      } catch (error) {
        console.error("Kitablar yüklənərkən xəta baş verdi:", error);
      }
    };
  
    fetchBooks();
  }, [offset, limit]); // limit-in də dəyişməsini izləyirik

  const loadMoreBooks = () => {
    setOffset(prevOffset => prevOffset + 10); // Hər dəfə 10 kitab gətirmək üçün offset-i artırırıq
    setLimit(10); // Daha çox yüklənərkən limit 10-a düşür
  };

  return (
    <div id='H_all'>
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
      <div className="btd O">
        <button id='daha' onClick={loadMoreBooks}>daha çox</button>
      </div>
    </div>
  );
}

export default H_all;

