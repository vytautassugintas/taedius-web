import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';

import HomeContainer from './containers/home/Home';
import LoginForm from './containers/login-form/LoginForm';
import SignUpForm from './containers/signup-form/SignUpForm';

import { getAccount } from './api';

const NoMatch = ({ location }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

class App extends Component {
  state = {
    isLoading: true
  }
  componentDidMount(){
    getAccount()
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  };
  
  render() {
    const { isLoading } = this.state;

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
