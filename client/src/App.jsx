import './App.scss';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import About from './pages/about';
import Mainlayout from './layout/mainlayout';

function App() {

  return (
    <>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainlayout />} >
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            </Route>
          </Routes>

        </BrowserRouter>
      </HelmetProvider>

    </>
  )
}

export default App
