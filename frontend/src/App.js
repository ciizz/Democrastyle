import React from 'react';
import Home from './Pages/Home';
import StyleTransfer from './Pages/StyleTransfer';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Result from './Pages/Result';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/Home"><Home /></Route>
        <Route path="/StyleTransfer"><StyleTransfer /></Route>
        <Route path="/Explore"><Explore /></Route>
        <Route path="/Profile"><Profile /></Route>
        <Route path="/Result"><Result /></Route>
        <Route path="*"><NotFound /></Route>
      </Switch>
    </Router>
  )
}

export default App;
