import './App.css'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Route, Routes, useNavigate } from 'react-router-dom'

 
function App() {

  return (
    <>

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/home' element={<Home/>}/>

    </Routes>
      
      
    </>
  )
}

export default App
