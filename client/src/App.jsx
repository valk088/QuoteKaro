import { useState ,useEffect } from 'react'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { saveUIDToLocalStorage } from './auth';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ProfilePage from './Pages/Profile'
import Dashboard from './Pages/Dashboard';
import MyEstimates from './Pages/MyEstimates';
import CreateEstimate from './Pages/CreateEstimate';
import NewEstimate from './Pages/NewEstimate';

function App() {

  useEffect(() => {
  saveUIDToLocalStorage();
}, []);


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/my-estimates" element={<MyEstimates/>} />
         <Route path='/new-estimate' element={<NewEstimate/>}></Route>

      </Routes>
    </BrowserRouter>
    
  
  )
}

export default App
