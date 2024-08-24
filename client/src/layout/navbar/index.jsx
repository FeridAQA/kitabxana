import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/App.contex';

function Navbar() {
  const { setSearchData } = useAppContext();
  const [query, setQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      console.log('Boş axtarış termi daxil edilib, sorğu göndərilmir.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/search?term=${query}`);
      const data = await response.json();

      // Axtarış nəticələrini context-ə ötür
      setSearchData(data);

      console.log("bu navbardakidi", data);
    } catch (error) {
      console.error("Axtarış zamanı xəta baş verdi:", error);
    }
  };

  return (
    <div id='navbar'>
      <div className="container O">
        <div className="L" onClick={() => setSearchData([]) &  setQuery([])} ><Link to={'/'}>logo</Link></div>
        <div className="M">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
        <div className="R">eee</div>
      </div>
    </div>
  );
}

export default Navbar;
