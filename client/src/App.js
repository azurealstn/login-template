import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Navbar from './components/views/Navbar/Navbar';
import Footer from './components/views/Footer/Footer';
import Auth from './hoc/auth';
import toDoListPage from './components/views/toDoListPage/toDoListPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Navbar />
        </nav>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/todos" component={Auth(toDoListPage, true)} />
        </Switch>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
