import React, { Component } from 'react';
import { Input, Button, Icon, List, Card, Transition } from 'semantic-ui-react'
import { getGroups, createGroup, deleteGroup } from '../../../api';

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

  handleRemoveClick = groupId => {
    deleteGroup(groupId)
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
        <div className='margin-top--md'>
          <Input
            fluid
            name='name'
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder='Create group'
          />
          <div className='margin-top--md'>
            <Button 
              fluid
              icon
              positive
              labelPosition='left'
              onClick={this.handleCreateClick}>
              <Icon name='plus' />
              Create
            </Button>
          </div>
          <div className='margin-top--md'>
          <Card.Group>
            {
              groups.map(group => (
                <Card fluid raised>
                  <Card.Content>
                  <Button 
                      className='button--no-border'
                      floated='right'
                      basic
                      icon
                      onClick={() => this.handleRemoveClick(group._id)}>
                      <Icon name='trash' />
                    </Button>
                    <Card.Header as='a' onClick={() => this.handleLinkClick(group)} content={group.name} />
                  </Card.Content>
                  <Card.Content extra>
                    <p>
                      <Icon name='user' />
                      {group.users.length} Members
                    </p>
                    <p>
                    <Icon name='tasks' />
                      {group.tasks.length} Tasks
                    </p>
                  </Card.Content>
                </Card>
              ))
            }
            </Card.Group>
          </div>
        </div>
      );
  }
}

export default GroupList;
