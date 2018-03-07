import React, { Component } from 'react';
import { Input, Button, Icon, List } from 'semantic-ui-react'
import { getGroups, createGroup } from '../../../api';

class GroupList extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      groups: [],
      selectedGroup: {},
      isLoading: false
    }
  }

  componentDidMount(){
    this.updateGroups();
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

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    const { groups, isLoading } = this.state;

    return isLoading
      ? null
      : (
        <div>
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
                  <List.Item 
                    as='a'                
                    key={group._id}
                    onClick={() => this.handleLinkClick(group)}>
                    {group.name}
                  </List.Item>    
                ))
              }
          </List>
        </div>
      );
  }
}

export default GroupList;
