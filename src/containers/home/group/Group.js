import React, { Component } from 'react';
import { getGroup } from '../../../api';
import Task from './task/Task';

class Group extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      group: {}
    }
  }
  
  componentDidMount(){
    getGroup(this.props.match.params.id)
      .then(group => this.setState({group: group, isLoading: false}));
  }

  render() {
    const {group, isLoading} = this.state;

    return isLoading
      ? null
      : (
        <div> 
          <Task groupId={group._id}/>
        </div>
      );
  }
}

export default Group;
