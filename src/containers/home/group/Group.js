import React, { Component } from "react";
import { getGroup, inviteToGroup, randomAssign } from "../../../api";
import { Input, Button, Icon, Header, Segment, List, Accordion } from 'semantic-ui-react'
import Task from "./task/Task";

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeIndex: 0,
      group: {}
    };
  }

  componentDidMount() {
    getGroup(this.props.match.params.id).then(group =>
      this.setState({ group: group, isLoading: false })
    );
  }

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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

  handleRandomAssign = () => {
    randomAssign(this.props.match.params.id).then(() => {
      getGroup(this.props.match.params.id).then(group =>
        this.setState({ group: group, isLoading: false }));
    });
  }
  render() {
    const { group, isLoading, activeIndex } = this.state;

    return isLoading ? null : (
      <div className='margin-top--md'>
        <Header as='h2'>
          <Icon name='group' />
          <Header.Content>
            {group.name}
          </Header.Content>
          <Header.Subheader>
          <Accordion>
            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleAccordionClick}>
              <Icon name='dropdown' />
              Group members ({group.users.length})
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <List>
                {
                  group.users.map(user => {
                    return (
                      <List.Item>
                        <List.Content>
                          <List.Header as='a'>{user.email}</List.Header>
                        </List.Content>
                      </List.Item>
                  )})
                }
              </List>
            </Accordion.Content>
          </Accordion>
          </Header.Subheader>
        </Header>
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
        <div className="margin-top--md">
          <Button
            fluid
            icon
            primary
            labelPosition="left"
            onClick={this.handleRandomAssign}>
            <Icon name="gamepad" />
            Random assign
          </Button>
        </div>
        <Task groupId={group._id} />
      </div>
    );
  }
}

export default Group;
