import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BioPage from './components/BioPage';
import BioPageForm from './components/BioPageForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/bio/:userId" component={BioPage} />
          <Route path="/bio-form" component={BioPageForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
