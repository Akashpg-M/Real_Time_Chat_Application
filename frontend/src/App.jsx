// import './App.css'

// import NavBar from './components/Navbar';
// import {Routes, Route, Navigate } from "react-router-dom";

// import HomePage from './pages/HomePage.jsx';
// import SignUpPage from './pages/SignUpPage.jsx';
// import LoginPage from './pages/LoginPage.jsx';
// import SettingsPage from './pages/SettingsPage.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';

// import {useAuthStore} from "./store/useAuthStore.js";
// import {useEffect} from "react";

// import {Loader} from "lucide-react";
// import {Toaster} from "react-hot-toast";

// function App() {
//   const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

//   useEffect(() => {
//     checkAuth();
//   },[checkAuth]);

//   console.log({ authUser });
  
//   if(isCheckingAuth && !authUser) return  (
//     <div className="flex items-center justify-center h-screen">
//       <Loader className = "size-10 animate-spin"/>
//     </div>
//   )

//   return (
//     <div>
//       <h1 className = 'text-red-500'>hello world</h1>
//       <NavBar/>

//       <Routes>
//         <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
//         <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
//         <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
//         <Route path='/settings' element={<SettingsPage/>}/>
//         {/* <Route path='/profile' element={<ProfilePage/>}/> */}

//         <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
//       </Routes>

//       <Toaster/>
//     </div>
//   )
// }

// export default App
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div >
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage /> } />
      </Routes> */}

      <Toaster />
    </div>
  );
};
export default App;