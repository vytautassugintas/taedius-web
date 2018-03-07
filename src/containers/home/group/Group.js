import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'
import { getAccount, getGroup, createGroup } from '../../../api';
import Task from './task/Task';

class Group extends Component {
  state = {
    isLoading: true,
    group: {}
  }

  componentWillReceiveProps(nextProps) {
    getGroup(nextProps.match.params.id)
    .then(group => {
      this.setState({group: group, isLoading: false})
    });
  }

  componentDidMount(){
    getGroup(this.props.match.params.id)
      .then(group => {
        this.setState({group: group, isLoading: false})
      });
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const {group, isLoading} = this.state;

    return isLoading
    ? null
    : (
      <div>
        This is group: {group._id}
        {

        }
        <Task groupId={group._id}/>
      </div>
    );
  }
}

export default Group;
