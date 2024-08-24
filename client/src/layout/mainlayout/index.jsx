import React from 'react'
import './index.scss'
import Navbar from '../navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'

function Mainlayout() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Mainlayout