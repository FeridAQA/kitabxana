import './App.scss';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import About from './pages/about';
import Mainlayout from './layout/mainlayout';

function App() {

  return (
    <div class="bg-white text-black">
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

    </div>
  )
}

export default App
