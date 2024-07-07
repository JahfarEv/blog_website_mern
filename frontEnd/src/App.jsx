import './App.css'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Post } from './pages/Post'
import { Signup } from './pages/Signup'
import { Route, Routes, useNavigate } from 'react-router-dom'

 
function App() {

  return (
    <>

    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/post' element={<Post/>}/>

    </Routes>
      
      
    </>
  )
}

export default App
