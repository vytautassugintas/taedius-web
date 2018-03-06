import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import './App.css';

import HomeContainer from './containers/home/Home';
import LoginForm from './containers/login-form/LoginForm';
import SignUpForm from './containers/signup-form/SignUpForm';
import Group from './containers/home/group/Group';

import { getAccount } from './api';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  state = {
    isLoading: true,
    redirectHome: false
  }
  componentDidMount(){
    getAccount()
      .then(() => this.setState({redirectHome: true}))
      .catch(() => fakeAuth.signout)
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  };
  
  render() {
    const {redirectHome, isLoading} = this.state;

    if(isLoading){
      return null;
    }

    return (
      <Router>
         <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUpForm} />
          <Route path='/home' component={HomeContainer}/>
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
