import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Input, Button, Icon, List } from 'semantic-ui-react'

import { addTask, getTasks } from '../../../../api';

class Task extends Component {
  state = {
    isLoading: true,
    title: undefined,
    points: undefined,
    tasks: []
  }

  componentWillReceiveProps(nextProps) {
    getTasks(nextProps.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
  }

  componentDidMount(){

  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleAddClick = () => {
    const {title, points} = this.state;
    addTask({
      title: title,
      points: points,
      groupId: this.props.groupId
    })
  };

  render() {
    const { tasks } = this.state;

    return (
      <div>
        This is tasks for: {this.props.groupId}
        <List>
        <List.Header>Tasks</List.Header>
            {
              tasks.map(task => (
                <List.Item key={task._id}>{task.title}</List.Item>    
              ))
            }
        </List>
        <Input
            fluid
            name='title'
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder='Add task'
            className='margin-top--md'
          />
          <Input
            name='points'
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder='Points'
            className='margin-top--md'
          />
          <div className='margin-top--md'>
            <Button 
              icon
              labelPosition='left'
              onClick={this.handleAddClick}>
              <Icon name='plus' />
              Create
            </Button>
          </div>
      </div>
    );
  }
}

export default Task;
