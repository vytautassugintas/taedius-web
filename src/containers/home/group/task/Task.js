import React, { Component } from 'react';
import { Input, Button, Icon, List } from 'semantic-ui-react'

import { addTask, getTasks } from '../../../../api';

class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      title: '',
      points: '',
      tasks: []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: '',
      points: '',
    })
    getTasks(nextProps.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
  }

  componentDidMount(){
    getTasks(this.props.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
    event.preventDefault();
  }

  handleAddClick = () => {
    const {title, points} = this.state;
    addTask({
      title: title,
      points: points,
      groupId: this.props.groupId
    })
    .then(() => {
      this.setState({
        title: '',
        points: '',
      })
    })
  };

  render() {
    const { title, points, tasks } = this.state;

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
            value={title}
            onChange={this.handleInputChange}
            placeholder='Add task'
            className='margin-top--md'
          />
          <Input
            name='points'
            value={points}
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
