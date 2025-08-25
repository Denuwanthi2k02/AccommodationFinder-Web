import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLoaderData, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AccommodationDetails from './pages/AccommodationDetails'
import Accommodations from './pages/Accommodations'
import Footer from './components/Footer'
import Layout from './pages/Owner/Layout'
import AddAccommodation from './pages/Owner/AddAccommodation'
import ManageAccommodations from './pages/Owner/ManageAccommodations'
import Dashboard from './pages/Owner/Dashboard'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './contex/AppContext'



const App = () => {

  const {showLogin} =useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')

  return (
    <>
    <Toaster/>
    {showLogin && <Login /> }
    
     {!isOwnerPath && <Navbar />}


     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Accommodation-details/:id' element={<AccommodationDetails/>}/>
      <Route path='/Accommodations' element={<Accommodations/>}/>
      <Route path='/owner' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='add-accommodation' element={<AddAccommodation/>}/>
          <Route path='manage-accommodations' element={<ManageAccommodations/>}/>

      </Route>
     </Routes>


    {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
