import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config';

function H_pop() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${config.BASE_URL}/popular`;

            try {
                const response = await axios.get(url);
                setBooks(response.data); 
                console.log("pop",response.data);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h2>Ən Popular </h2>
            <div className="all-books-container">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div key={book._id} className="book-item">
                            <img className="book-cover" src={book.bookImage} alt={book.title} />
                            <div className="book-details">
                                <h2 className="book-title">{book.title}</h2>
                                <p className="book-author"> {book.author}</p>
                                <p className="book-author"> $ {book.price}</p>
                                <p className="book-author"> rating: {book.averageRating}</p>
                                <p className="book-description"> {book.description}</p>
                                <div className="book-actions">
                                    <button className="btn btn-primary">Buy Now</button>
                                    <button className="btn btn-secondary">Details</button>
                                    <button className="btn btn-wishlist">Add to Wishlist</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

            </div>
        </>

    );
}

export default H_pop;
