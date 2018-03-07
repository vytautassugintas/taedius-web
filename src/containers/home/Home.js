import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { getAccount } from '../../api';
import Group from './group/Group';
import GroupList from './group-list/GroupList';

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: undefined,
      isLoading: true
    }
  }

  componentDidMount(){
    getAccount()
      .then(profile => {
        this.setState({
          user: profile,
          isLoading: false
        })
      })
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
    const { isLoading, user } = this.state;
    
    return isLoading
      ? null
      : (
        <Container>
          <p>This is home</p>
          <p>Profile: {user.email}</p>
          <Route exact path="/home" component={GroupList} />
          <Route path="/home/group/:id" component={Group} />
        </Container>
      );
  }
}

export default HomeContainer;
