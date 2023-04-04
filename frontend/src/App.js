import React from 'react';
import Home from './Pages/Home';
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Logout from "./Pages/Logout";
import StyleTransfer from './Pages/StyleTransfer';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Result from './Pages/Result';
import NavBar from './Components/NavBar';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext"; // import this

// TODO: if user is not logged in: only allow Home, Explore and login pages
// TODO: non-logged in users are redirected to login page if they try to access other pages
function App() {
  return (
    <AuthProvider>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout modal={true} setModal={null} />} />
        <Route path="/StyleTransfer" element={<StyleTransfer />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Profile/*" element={<Profile />} />
        <Route path="/Result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
