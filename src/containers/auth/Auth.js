import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoginForm from './login-form/LoginForm';
import SignUpForm from './signup-form/SignUpForm';

class Auth extends Component {
  render() {
    return (
      <Container>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignUpForm}/>
      </Container>
    );
  }
}

export default Auth;
