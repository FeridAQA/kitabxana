import React, { useState } from 'react'
import './index.scss'
import { Link } from 'react-router-dom'





function Navbar() {

  const [query, setQuery] = useState(''); // query üçün state yaratma

  const handleSearch = async (event) => {
    event.preventDefault();
    // http://localhost:3000/api/search?term=əzir
    const response = await fetch(`http://localhost:3000/api/search?term=${query}`);
    const data = await response.json();
    // searchResults state-i yeniləmək üçün burada uyğun funksiyanı çağırın
    console.log(data); // Bu xətt nəticəni yoxlamaq üçün əlavə edilib
  };

  const [searchResults, setSearchResults] = useState([]);


  return (
    <div id='navbar'>
      <div className="container O">
        <div className="L">logo</div>
        <div className="M">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // input dəyərini yeniləyin
            />
            <button type="submit">Search</button>
          </form>

        </div>
        <div className="R">eee</div>
      </div>

    </div>
  )
}

export default Navbar