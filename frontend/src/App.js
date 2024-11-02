import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import FileUpload from './components/FileUpload';
import BioPage from './components/BioPage';
import Settings from './components/Settings';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="app">
        {isAuthenticated && (
          <>
            <Navbar 
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
              setIsAuthenticated={setIsAuthenticated}
            />
            <Sidebar isOpen={sidebarOpen} />
          </>
        )}
        <main className={`main-content ${isAuthenticated ? 'authenticated' : ''} ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <Switch>
            <Route 
              path="/login" 
              render={(props) => (
                <Login {...props} setIsAuthenticated={setIsAuthenticated} />
              )} 
            />
            <Route path="/register" component={Register} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/upload" component={FileUpload} />
            <PrivateRoute path="/settings" component={Settings} />
            <Route path="/bio/:userId" component={BioPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
