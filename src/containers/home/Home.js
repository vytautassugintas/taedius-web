import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'
import {getAccount, getGroups, createGroup} from '../../api';
import Group from './group/Group';
import GroupList from './group-list/GroupList';

class HomeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: undefined,
      groups: [],
      selectedGroup: {},
      name: '',
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

  handleLinkClick = group => {
    this.setState({selectedGroup: group})
    this.props.history.push('/home/group/' + group._id);
  }

  updateGroups(){
    getGroups().then(groups => this.setState({groups: groups}))
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
          <Route exact path="/home" render={ routeProps => 
            <GroupList {...routeProps} 
              isLoading={isLoading} 
              groups={groups} 
              handleLinkClick={this.handleLinkClick}
            />} 
          />
          <Route path="/home/group/:id" component={Group} />
        </Container>
      );
  }
}

export default HomeContainer;
