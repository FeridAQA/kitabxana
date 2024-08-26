// import React, { useState } from 'react';
// import './index.scss';
// import { Link } from 'react-router-dom';
// import { useAppContext } from '../../context/App.contex';

// function Navbar() {
//   const { setSearchData } = useAppContext();
//   const [query, setQuery] = useState('');

//   const handleSearch = async (event) => {
//     event.preventDefault();
//     if (!query.trim()) {
//       console.log('Boş axtarış termi daxil edilib, sorğu göndərilmir.');
//       return;
//     }
//     try {
//       const response = await fetch(`http://localhost:3000/api/search?term=${query}`);
//       const data = await response.json();

//       // Axtarış nəticələrini context-ə ötür
//       setSearchData(data);

//       console.log("bu navbardakidi", data);
//     } catch (error) {
//       console.error("Axtarış zamanı xəta baş verdi:", error);
//     }
//   };

//   return (
//     <div id='navbar'>
//       <div className="container O">
//         <div className="L" onClick={() => setSearchData([]) &  setQuery([])} ><Link to={'/'}>logo</Link></div>
//         <div className="M">
//           <form onSubmit={handleSearch}>
//             <input
//               type="text"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//             <button type="submit">Search</button>
//           </form>
//         </div>
//         <div className="R">eee</div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/App.contex';
import './index.scss';

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
      setSearchData(data);
      console.log("bu navbardakidi", data);
    } catch (error) {
      console.error("Axtarış zamanı xəta baş verdi:", error);
    }
  };

  return (
    <div className="navbar bg-gray-900 shadow-md px-4">
      <div className="flex flex-1 items-center">
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl text-white"
          onClick={() => setSearchData([]) & setQuery('')}
        >
          logo
        </Link>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <form onSubmit={handleSearch} className="form-control flex flex-row items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="input input-bordered w-36 md:w-auto bg-gray-800 text-white placeholder-gray-400"
          />
          <button type="submit" className="btn btn-primary ml-2 text-white">Search</button>
        </form>
      </div>
      <div className="flex flex-1 justify-end items-center gap-4">
        <Link to="/basket" className="btn btn-ghost text-white">
          <i className="fas fa-shopping-basket"></i>
        </Link>
        <Link to="/wishlist" className="btn btn-ghost text-white">
          <i className="fas fa-heart"></i>
        </Link>
        <Link to="/sales-history" className="btn btn-ghost text-white">
          <i className="fas fa-history"></i>
        </Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/profile">Profile <span className="badge">New</span></Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/logout">Logout</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default Navbar;


