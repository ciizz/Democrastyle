import React from 'react';
import Home from './Pages/Home';
import Inference from './Pages/Inference';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/Home"><Home /></Route>
        <Route path="/Inference"><Inference /></Route>
        <Route path="/Explore"><Explore /></Route>
        <Route path="/Profile"><Profile /></Route>
      </Switch>
    </Router>
  );
}

export default App;
