import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'

import {getAccount, getGroups, createGroup} from '../../api';

class HomeContainer extends Component {
  state = {
    user: undefined,
    groups: [],
    name: undefined,
    isLoading: true
  }

  componentDidMount(){
    getAccount()
      .then(profile => {
        this.setState({
          user: profile,
          isLoading: false
        })
        this.updateGroups()
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

  updateGroups(){
    getGroups().then(groups => this.setState({groups: groups}))
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleCreateClick = () => {
    createGroup({name: this.state.name})
      .then(() => {
        this.updateGroups();
      })
  }

  render() {
    const {isLoading, user, groups} = this.state;

    return isLoading
      ? null
      : (
        <Container>
          <p>This is home</p>
          <p>Profile: {user.email}</p>
          <Input
            fluid
            name='name'
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder='Create group'
          />
          <div className='margin-top--md'>
            <Button 
              icon
              labelPosition='left'
              onClick={this.handleCreateClick}>
              <Icon name='plus' />
              Create
            </Button>
          </div>
          <List link>
          <List.Header>Groups</List.Header>
            {
              groups.map(group => (
                <List.Item key={group._id} as='a'>{group.name}</List.Item>    
              ))
            }
          </List>
        </Container>
      );
  }
}

export default HomeContainer;