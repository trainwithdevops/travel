import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import FindMembers from './pages/FindMembers';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={() => <div>About Us</div>} />
        <Route path="/contact" component={() => <div>Contact Us</div>} />
        <Route path="/login" component={() => <div>Login</div>} />
        <Route path="/signup" component={() => <div>Signup</div>} />
        <ProtectedRoute path="/blog" component={() => <div>Blog</div>} />
        <ProtectedRoute path="/find-members" component={FindMembers} />
      </Switch>
    </Router>
  );
};

export default App;
