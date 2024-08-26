import React, { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);
  const [basket, setBasket] = useState(() => {
    const savedBasket = localStorage.getItem('basket');
    return savedBasket ? JSON.parse(savedBasket) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // hər dəfə basılınnada əlave edir
  const addToBasket = (item) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(basketItem => basketItem._id === item._id);

      if (existingItem) {
        // Əgər məhsul artıq səbətdədirsə, onun sayını artır
        return prevBasket.map(basketItem =>
          basketItem._id === item._id
            ? { ...basketItem, count: basketItem.count + 1 }
            : basketItem
        );
      } else {
        // Əks halda, məhsulu səbətə əlavə et və count-u 1 olaraq təyin et
        return [...prevBasket, { ...item, count: 1 }];
      }
    });

  };
  // həmin itemi hamısın silir
  const removeAllFromBasket = (itemId) => {
    setBasket((prevBasket) => prevBasket.filter(item => item._id !== itemId));
  };


  // basketdən bir ədəd azldır
  const removeFromBasket = (itemId) => {
    setBasket((prevBasket) => {
      const existingItem = prevBasket.find(item => item._id === itemId);

      if (existingItem && existingItem.count > 1) {
        // Əgər məhsulun sayı 1-dən çoxdursa, sadəcə sayını azaldırıq
        return prevBasket.map(item =>
          item._id === itemId
            ? { ...item, count: item.count - 1 }
            : item
        );
      } else {
        // Əks halda, məhsulu səbətdən çıxarırıq
        return prevBasket.filter(item => item._id !== itemId);
      }
    });
  };

  // bütun basketi silir
  const clearBasket = () => {
    setBasket([]);
  };


  const toggleWishlist = (item) => {
    let action;

    setWishlist((prevWishlist) => {
        const existingItem = prevWishlist.find(wishlistItem => wishlistItem._id === item._id);

        if (existingItem) {
            // Məhsul varsa, çıxarırıq
            action = 'removed';
            return prevWishlist.filter(wishlistItem => wishlistItem._id !== item._id);
        } else {
            // Məhsul yoxdursa, əlavə edirik
            action = 'added';
            return [...prevWishlist, { ...item, count: 1 }];
        }
    });

    return action;
};


  const clearWishlist = () => {
    setWishlist([]);
  };

  const data = {
    searchData,
    setSearchData,
    basket,
    addToBasket,
    removeFromBasket,
    clearBasket,
    wishlist,
    toggleWishlist,
    clearWishlist,
    removeAllFromBasket,


  };

  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
