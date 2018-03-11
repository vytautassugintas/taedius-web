import React, { Component } from 'react';
import { Input, Button, Icon, List, Progress, Modal, Header, Form, Checkbox } from 'semantic-ui-react'
import { addTask, getTasks, removeTask } from '../../../../api';

class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      isModalOpen: false,
      title: '',
      points: '',
      percent: 0,
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
      getTasks(this.props.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
      this.closeModal();
    })
  };

  handleRemoveClick = (groupId, taskId) => {
    removeTask({
      groupId: groupId,
      taskId: taskId
    }).then(() => {
      getTasks(this.props.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
    })
  }

  openModal = () => {
    this.setState({
      isModalOpen: true
    })
  }

  closeModal = () => {
      this.setState({
        isModalOpen: false
      })
  }

  render() {
    const { title, points, tasks, isModalOpen } = this.state;

    return (
      <div>
        <div className='margin__horizontal--md'>
          <Progress percent={this.state.percent} indicating />
        </div>
        <Button onClick={this.openModal}>Add task</Button>
        <Modal 
          open={isModalOpen}
          onOpen={this.openModal}
          onClose={this.closeModal}
          closeIcon>
          <Modal.Header>Add task</Modal.Header>
          <Modal.Content>
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
          </Modal.Content>
        </Modal>
        
        <List>
        <List.Header>Tasks</List.Header>
            {
              tasks.map(task => (
                <List.Item key={task._id}>
                <List.Content floated='right'>
                  <Button 
                    basic
                    icon
                    onClick={() => this.handleRemoveClick(this.props.groupId, task._id)}
                    >
                    <Icon name='trash' />
                  </Button>
                </List.Content>
                <List.Content>
                  <List.Header 
                    as='a'
                    >
                    {task.title}
                  </List.Header>
                  Points: {task.points} | Assignee: {task.assignee ? task.assignee : '-'}
                </List.Content>
                </List.Item>    
              ))
            }
        </List>
      </div>
    );
  }
}

export default Task;
