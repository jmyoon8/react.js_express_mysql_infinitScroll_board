import React,{ Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from'react-router-dom'
import CustomerCRUD from'./components/Customer/CustomerCRUD'
import '../../src/views/CSSS/LandingPage.css'
import '../../src/views/CSSS/cc.css'
import '../../src/views/CSSS/modal.css'

import LandingPage from './components/main/LandingPage';
function App() {

  return (
    <Suspense fallback={(<div>loading....</div>)}>
      <Router>
        <Switch>
          <Route exact path="/"  component={LandingPage}/>
          <Route exact path="/board"  component={CustomerCRUD}/>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
