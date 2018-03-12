import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
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
    console.log("MOUNT")
    getAccount()
      .then(succes => {
        this.setState({redirectHome: true});
      })
      .catch(err => {
        this.setState({redirectLogin: true});
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

    return null;
  }
}

export default Auth;
