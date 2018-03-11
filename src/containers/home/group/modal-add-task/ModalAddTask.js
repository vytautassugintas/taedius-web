import React, { Component } from 'react';
import { Input, Button, Icon, List, Progress, Modal, Header, Form, Checkbox } from 'semantic-ui-react'
import { addTask, getTasks, removeTask } from '../../../../api';

export default class ModalAddTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      isModalOpen: false,
      title: '',
      points: ''
    }
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
      this.props.onAdd();
      this.closeModal();
    })
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
    event.preventDefault();
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
    const { title, points, isModalOpen } = this.state;

    return (
      <div>
        <Button 
        fluid
        icon
        positive
        labelPosition='left'
        onClick={this.openModal}>
        <Icon name='plus' />
          Add task
        </Button>
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
              placeholder='Task title'
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
      </div>
    );
  }

}