import React from 'react';
import './SearchModal.scss'; // Modal üçün xüsusi stil əlavə edin
import { useAppContext } from '../../context/App.contex';

function Search() {
    const { searchData } = useAppContext();

    if (!searchData || searchData.length === 0) {
        return null; // Əgər data yoxdursa, heç bir şey render olunmasın
    }

    return (
        <div id='H_all'>
            <div className="container">
                <h2>Axtarış Nəticələri</h2>
            </div>
            <div className="all-books-container">
                {searchData.map((item, index) => (
                    <div key={index} className="book-item">
                        <img src={item.coverImage} alt={item.title} className="book-cover" />
                        <div className="book-details">
                            <h3 className="book-title">{item.title}</h3>
                            <p className="book-author">{item.author}</p>
                            <p className="book-description">{item.description}</p>
                            <p> $ {item.purchasePrice}</p>
                            <div className="book-actions">
                                <button className="btn btn-primary">View Details</button>
                                <button className="btn btn-secondary">Add to Basket</button>
                                <button className="btn btn-wishlist">Add to Wishlist</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;
