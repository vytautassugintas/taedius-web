import React, { Component } from 'react';
import LoginForm from './login-form/LoginForm';
import SignUpForm from './signup-form/SignUpForm';

class Auth extends Component {
  render() {
    return (
      <div>
        <LoginForm/>
        <SignUpForm/>
        this is auth
      </div>
    );
  }
}

export default Auth;
