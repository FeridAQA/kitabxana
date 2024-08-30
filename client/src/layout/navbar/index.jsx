import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/App.contex';
import './index.scss';
import config from '../../config';

function Navbar() {
  const { basket, wishlist, setSearchData } = useAppContext();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      console.log('Boş axtarış termi daxil edilib, sorğu göndərilmir.');
      return;
    }
    try {
      const response = await fetch(`${config.BASE_URL}/search?term=${query}`);
      const data = await response.json();
      setSearchData(data);
      console.log("bu navbardakidi", data);
    } catch (error) {
      console.error("Axtarış zamanı xəta baş verdi:", error);
    }
  };

  const handleLoginLogout = () => {
    const token = localStorage.getItem('token');
    if (token) {
      localStorage.removeItem('token'); // Tokeni sil
      navigate('/login'); // Login səhifəsinə yönləndir
    } else {
      navigate('/login'); // Əgər token yoxdursa, login səhifəsinə yönləndir
    }
  };

  // Basketdəki ümumi məhsul sayını hesablayan funksiya
  const totalItemsInBasket = basket.reduce((total, item) => total + item.count, 0);

  return (
    <div className="navbar sticky top-0 left-0 w-full bg-gray-900 shadow-md px-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl text-white"
            onClick={() => setSearchData([]) & setQuery('')}
          >
            logo
          </Link>
        </div>
        <div className="flex items-center">
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
        <div className="flex items-center gap-4">
          <div className="relative">
            <Link to="/basket" className="btn btn-ghost text-white">
              <i className="fas fa-shopping-basket"></i>
              {totalItemsInBasket > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItemsInBasket}
                </span>
              )}
            </Link>
          </div>

          <div className="relative">
            <Link to="/wishlist" className="btn btn-ghost text-white">
              <i className="fas fa-heart"></i>
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>

          <Link to="/sales" className="btn btn-ghost text-white">
            <i className="fas fa-history"></i>
          </Link>
          
          <Link onClick={handleLoginLogout} to="/login" className="btn btn-ghost text-white">
            <i className="fas fa-sign-in-alt"></i> Login
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
