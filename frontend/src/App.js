import React from 'react';
import Home from './Pages/Home';
import StyleTransfer from './Pages/StyleTransfer';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Result from './Pages/Result';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/StyleTransfer" element={<StyleTransfer />} />
      <Route path="/Explore" element={<Explore />} />
      <Route path="/Profile/:username" element={<Profile />} />
      <Route path="/Result" element={<Result />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
