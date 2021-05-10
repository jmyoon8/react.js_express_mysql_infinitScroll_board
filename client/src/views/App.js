import React,{ Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from'react-router-dom'

import LandingPage from './components/main/LandingPage';
import Content from './components/main/Content';


function App() {

  return (
    
      <Router>
        <Switch>
          <Route exact path="/"  component={LandingPage}/>
          <Route exact path="/content/:id"  component={Content}/>

        </Switch>
      </Router>
   
    
  );
}

export default App;

