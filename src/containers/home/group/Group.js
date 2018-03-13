import React, { Component } from "react";
import { getGroup, inviteToGroup } from "../../../api";
import { Input, Button, Icon } from 'semantic-ui-react'
import Task from "./task/Task";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      group: {}
    };
  }

  componentDidMount() {
    getGroup(this.props.match.params.id).then(group =>
      this.setState({ group: group, isLoading: false })
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleInviteClick = () => {
    inviteToGroup({
      email: this.state.email,
      groupId: this.props.match.params.id
    }).then(() => {
      //TODO: invited, show taost
    });
  };

  render() {
    const { group, isLoading } = this.state;

    return isLoading ? null : (
      <div>
        <Input
          fluid
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          placeholder="Memer email"
        />
        <div className="margin-top--md">
          <Button
            fluid
            icon
            positive
            labelPosition="left"
            onClick={this.handleInviteClick}
          >
            <Icon name="plus" />
            Invite
          </Button>
        </div>
        <Task groupId={group._id} />
      </div>
    );
  }
}

export default Group;
