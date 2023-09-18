import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import { useLocation, Navigate } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import DetailCard from './components/Detail Card/DetailCard'
import Form from './components/Form/Form'
import { useState } from 'react'
import About from './components/About/About'

function App() {
  const location = useLocation().pathname;
  const [menuBurger, setMenuBurger] = useState(false)
  const handleMenu = () => {
    setMenuBurger(!menuBurger)
  }
  const handleMenuFalse = () => {
    setMenuBurger(false)
  }
  const [filtersNav, setFiltersNav] = useState(false)
  const handleFiltersNav = () => {
    setFiltersNav(!filtersNav)
  }
  const handleFiltersNavFalse = () => {
    setFiltersNav(false)
  }

  return (
    <div>
      {location !== "/" && <Nav
        handleMenuFalse={handleMenuFalse}
        handleFiltersNav={handleFiltersNav}
        menuBurger={menuBurger}
        handleMenu={handleMenu}
        handleFiltersNavFalse={handleFiltersNavFalse}></Nav>}
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path='/home' element={<Home handleMenuFalse={handleMenuFalse} filtersNav={filtersNav} handleMenu={handleMenu} menuBurger={menuBurger} />}></Route>
        <Route path='/form' element={<Form handleMenuFalse={handleMenuFalse} handleMenu={handleMenu} menuBurger={menuBurger} />}></Route>
        <Route path='/country/:id' element={<DetailCard handleMenuFalse={handleMenuFalse} menuBurger={menuBurger} handleMenu={handleMenu} />}></Route>
        <Route path="/about" element={<About handleMenuFalse={handleMenuFalse} handleMenu={handleMenu} menuBurger={menuBurger} />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  )
}

export default App
