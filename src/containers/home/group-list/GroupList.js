import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'
import { getAccount, getGroup, createGroup } from '../../../api';

class GroupList extends Component {
  render() {
    const { groups, isLoading } = this.props;

    return isLoading
    ? null
    : (
      <List link>
        <List.Header>Groups</List.Header>
          {
            groups.map(group => (
              <List.Item 
                as='a'                
                key={group._id}
                onClick={() => this.props.handleLinkClick(group)}>
                {group.name}
              </List.Item>    
            ))
          }
      </List>
    );
  }
}

export default GroupList;
