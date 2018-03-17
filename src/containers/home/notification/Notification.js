import React, { Component } from 'react';
import { Dropdown, Input, Button, Icon, Label, Header, Menu, Transition } from 'semantic-ui-react'
import { getNotifications, getEvents, postAction } from '../../../api';

export default class Notifications extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      notifications: [],
      events: []
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
    getEvents()
      .then(events => {
        this.setState({
          events: events,
          visible: !this.state.visible
        })
      })
      .catch(err => this.setState({
        events: [],
      }))
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })
  }

  handleActionClick = action => {
    postAction({link: action.link, type: action.type})
      .then(ok => console.log)
  }

  render() {
    const { isLoading, notifications, events } = this.state;
    
    let opts;

    if (events.length) {
      opts = events.map(event => ({
        key: event._id,
        content: 
          <Dropdown.Item>
            <Header 
              icon='group' 
              content={event.type === 'GroupInvite' ? 'Group Invite' : 'Something happended'}
              subheader='You have been invited to the group'
            />
            <Button.Group widths='2'>
              <Button onClick={() => this.handleActionClick({link: event.actionLink, type: 'decline'})} negative>Decline</Button>
              <Button onClick={() => this.handleActionClick({link: event.actionLink, type: 'accept'})} positive>Accept</Button>
            </Button.Group>
          </Dropdown.Item>
    }))
    } else {
      opts = [{
        key: 1,
        content:
          <div>
            <Header
              content='Nothig happening'
              subheader='Yep nothing here'
            />
          </div>
      }]
    };

    return isLoading
      ? null
      : (
          <Dropdown
            item
            options={opts}
            labeled
            icon={false}
            trigger={(
              <span>
                <Icon name='mail' /> 
                  <Label circular>
                    {events.length.toString()}
                  </Label>
              </span>
            )}>
          </Dropdown>
      );
  }
}
