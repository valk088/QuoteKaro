import { useState ,useEffect } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { saveUIDToLocalStorage } from './auth';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProfilePage from './Pages/Profile'
function App() {

  useEffect(() => {
  saveUIDToLocalStorage();
}, []);


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
    
  
  )
}

export default App
