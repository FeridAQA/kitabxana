import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchData, setSearchData] = useState([]);

  const data = {searchData, setSearchData }
  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () =>  useContext(AppContext);
