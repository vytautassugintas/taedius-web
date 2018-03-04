import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import {getAccount} from '../../api';

class HomeContainer extends Component {
  state = {
    user: undefined,
    isLoading: true
  }
  componentDidMount(){
    getAccount()
      .then(profile => this.setState({
        user: profile,
        isLoading: false
      }))
      .catch(profile => this.setState({
        user: undefined,
        isLoading: false
      }))
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }
  render() {
    const {isLoading, user} = this.state;
    
    if(isLoading){
      return null;
    }
    return (
      <Container>
        <p>This is home</p>
        <p>Profile: {user.email}</p>
      </Container>
    );
  }
}

export default HomeContainer;
