import './App.css'
import { EditModal } from './components/EditModal'
import Home from './pages/Home'
import { Login } from './pages/Login'
import { Post } from './pages/Post'
import PostDetail from './pages/PostDetail'
import { Signup } from './pages/Signup'
import { Route, Routes, useNavigate,useParams } from 'react-router-dom'
import VerifyEmail from './pages/VerifyEmail'
import { createContext } from 'react'
import { AuthContextProvider } from './context/AuthContext'

const userContext = createContext() 

const routing = ()=>{

}

function App() {
const {id} = useParams()
  return (
    <>
<AuthContextProvider>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/post' element={<Post/>}/>
      <Route path='/post-detail/:id' element={<PostDetail/>}/>
      <Route path='/edit-post' element={<EditModal/>}/>
      

    </Routes>
    </AuthContextProvider>
      
    </>
  )
}

export default App
