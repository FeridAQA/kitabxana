import React from 'react';
import H_pop from '../../components/H_pop';
import H_all from '../../components/H_all';
import Search from '../../components/search';
import { useAppContext } from '../../context/App.contex';
import H_Best from '../../components/H_Best';

function Home() {
  const { searchData } = useAppContext();

  if (searchData && searchData.length > 0) {
    return <Search />; // Yalnız Search komponentini render edir
  }

  return (
    <div>
      <Search/>
      <H_pop></H_pop>
      <H_Best></H_Best>
      <H_all></H_all>
    </div>
  );
}

export default Home;
