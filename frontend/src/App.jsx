import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import NavBar from './components/NavBar.js';
import {Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './page/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {

  return (
    <div>
      <h1 className = 'text-red-500'>hello world</h1>

      <NavBar/>

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App
