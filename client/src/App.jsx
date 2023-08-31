import './App.css'
import {Routes, Route} from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import { useLocation } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import DetailCard from './components/Detail Card/DetailCard'
import Form from './components/Form/Form'

function App() {
  const location = useLocation().pathname;

  return (
    <div>
      {location !== "/" && <Nav></Nav>}
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/form' element={<Form/>}></Route>
        <Route path='/country/:id' element={<DetailCard/>}></Route>
      </Routes>
    </div>
  )
}

export default App
