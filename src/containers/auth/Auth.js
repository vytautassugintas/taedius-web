import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoginForm from './login-form/LoginForm';
import SignUpForm from './signup-form/SignUpForm';
import { getAccount } from '../../api';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirectHome: false,
      redirectLogin: false
    }
  }
  
  componentDidMount(){
    getAccount()
      .then(succes => {
        this.setState({redirectHome: true});
      })
      .catch(err => {
        const {pathname} = this.props.location;
        if (pathname !== '/login') {
          this.setState({redirectLogin: true});
        }
      })
  }

  render() {
    const {redirectHome, redirectLogin} = this.state;
    
    if (redirectHome) {
      return <Redirect to='/home' />;
    }

    if (redirectLogin) {
      return <Redirect to='/login' />;
    }

    return (
      <Container>
        <Route path='/login' component={LoginForm}/>
        <Route path='/signup' component={SignUpForm}/>
      </Container>
    );
  }
}

export default Auth;
