import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLoaderData, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AccommodationDetails from './pages/AccommodationDetails'
import Accommodations from './pages/Accommodations'
import Footer from './components/Footer'

const App = () => {

  const[showLogin, setShowLogin ] = useState(false)
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
     {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}


     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Accommodation-details/:id' element={<AccommodationDetails/>}/>
      <Route path='/Accommodations' element={<Accommodations/>}/>


     </Routes>


    {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
