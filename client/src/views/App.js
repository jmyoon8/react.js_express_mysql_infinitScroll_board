import React,{ Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from'react-router-dom'
import CustomerCRUD from'./components/Customer/CustomerCRUD'
function App() {

  return (
    <Suspense fallback={(<div>loading....</div>)}>
      <Router>
        <Switch>
          <Route exact path="/"  component={CustomerCRUD}/>
          <Route exact path="/board"  component={CustomerCRUD}/>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
