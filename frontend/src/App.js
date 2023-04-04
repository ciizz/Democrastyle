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

        {["/", "/Home", "/home"].map(path => (
          <Route key="home" path={path} element={<Home />} />
        ))}
        {["/Register", "/register"].map(path => (
          <Route path={path} element={<Register />} />
        ))}
        {["/Login", "/login"].map(path => (
          <Route path={path} element={<Login />} />

        ))}
        {["/Logout", "/logout"].map(path => (
          <Route path={path} element={<Logout modal={true} setModal={null} />} />

        ))}
        {["/StyleTransfer", "/style-transfer"].map(path => (
          <Route path={path} element={<StyleTransfer />} />

        ))}
        {["/Explore", "/explore"].map(path => (
          <Route path={path} element={<Explore />} />

        ))}
        {["/Profile", "/profile", "/profile/*"].map(path => (
          <Route path={path} element={<Profile />} />

        ))}
        {["/Result", "/result"].map(path => (
          <Route path={path} element={<Result />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
