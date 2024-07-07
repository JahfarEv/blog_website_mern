import './App.css'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Post } from './pages/Post'
import PostDetail from './pages/PostDetail'
import { Signup } from './pages/Signup'
import { Route, Routes, useNavigate,useParams } from 'react-router-dom'

 
function App() {
const {id} = useParams()
  return (
    <>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/post-detail/:id' element={<PostDetail/>}/>

    </Routes>
      
      
    </>
  )
}

export default App
