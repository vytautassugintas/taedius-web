import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Container, Menu } from 'semantic-ui-react'
import { getAccount, logout } from '../../api';
import Group from './group/Group';
import GroupList from './group-list/GroupList';
import Auth from '../auth/Auth';
import Notification from './notification/Notification'

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: undefined,
      isLoading: true,
      activeItem: ''
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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

  logout = () => {
    logout().then(() => {
      this.props.history.replace('/login');
    })
  }

  render() {
    const { isLoading, user, activeItem } = this.state;
    
    return isLoading
      ? null
      : (
        <Container>
          <button onClick={this.logout}>
            Logout
          </button>
          <Auth />
          <Notification />
          <Route exact path="/home" component={GroupList} />
          <Route path="/home/group/:id" component={Group} />
        </Container>
      );
  }
}

export default HomeContainer;
