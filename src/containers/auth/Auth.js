import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import LoginForm from './login-form/LoginForm';
import SignUpForm from './signup-form/SignUpForm';

class Auth extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
        <div>
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignUpForm}/>
        </div>
      </div>
    );
  }
}

export default Auth;
