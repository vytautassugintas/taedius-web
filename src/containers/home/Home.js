import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { Container, Menu, Label, Icon } from 'semantic-ui-react'
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
      activeItem: 'home'
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
        <div>
          <Menu attached='top' secondary>
            <Notification />
            <Menu.Menu position='right'>
              <Menu.Item onClick={this.logout}>
                <Icon name='log out' />
                Log out
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Container>
            <Auth />
            <Route exact path="/home" component={GroupList} />
            <Route path="/home/group/:id" component={Group} />
          </Container>
        </div>
      );
  }
}

export default HomeContainer;
