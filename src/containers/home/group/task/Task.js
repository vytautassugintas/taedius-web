import React, { Component } from 'react';
import { Input, Button, Icon, List, Progress, Modal, Header, Form, Checkbox } from 'semantic-ui-react'
import { addTask, getTasks, removeTask } from '../../../../api';
import ModalAddTask from '../modal-add-task/ModalAddTask';

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

  handleAdd = () => { 
      getTasks(this.props.groupId)
      .then(result => this.setState({
        tasks: result.tasks
      }))
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

  render() {
    const { title, points, tasks, isModalOpen } = this.state;

    return (
      <div>
        <div className='margin__horizontal--md'>
          <Progress percent={this.state.percent} indicating />
        </div>
        <ModalAddTask 
          groupId={this.props.groupId}
          onAdd={this.handleAdd} />
        
        <List>
        <List.Header>Tasks</List.Header>
            {
              tasks.map(task => (
                <List.Item key={task._id}>
                <List.Content floated='right'>
                  <Button
                    className='button--no-border'
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
