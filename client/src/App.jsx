import './App.scss';

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import About from './pages/about';
import Mainlayout from './layout/mainlayout';
import Sing_in from './pages/sing_in';
import Login from './pages/login';
import Detail from './pages/detail';
import Basket from './pages/basket';
import ProtectedRoute from './routes/ProtectedRoute';
import Wishlist from './pages/wish';
import { Toaster } from 'react-hot-toast';
import SalesHistory from './pages/SalesHistory/SalesHistory';

function App() {

  return (
    <div class="bg-white text-black">

      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainlayout />} >
              <Route path="/" element={<Home />} />
              <Route path="/sales" element={
                <ProtectedRoute>
                  <SalesHistory />
                </ProtectedRoute>} />
              <Route path="/basket" element={
                <ProtectedRoute>
                  <Basket />
                </ProtectedRoute>} />
              <Route path="/wishlist" element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>} />
              <Route element={<Detail></Detail>} path="/:id"  ></Route>
            </Route>
            <Route path="/singin" element={<Sing_in />} />
            <Route path="/login" element={<Login />} />
          </Routes>

        </BrowserRouter>
      </HelmetProvider>

    </div>
  )
}

export default App
