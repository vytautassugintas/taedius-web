import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'

import {getAccount, getGroup, createGroup} from '../../../api';

class Group extends Component {
  state = {
    isLoading: true,
    group: {}
  }

  componentWillReceiveProps(nextProps) {
    const currentId = this.props.match.params.id
    const nextId = nextProps

    if (currentId !== nextId) {
      getGroup(this.props.match.params.id)
      .then(group => {
        console.log('got group', group);
        this.setState({group: group, isLoading: false})
      });
    }
  }

  componentDidMount(){
    getGroup(this.props.match.params.id)
      .then(group => {
        console.log('got group', group);
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
      </div>
    );
  }
}

export default Group;
