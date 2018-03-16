import React, { Component } from 'react';
import { Dropdown, Input, Button, Icon, Label, Header, Menu } from 'semantic-ui-react'
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
        console.log(events);
        this.setState({
          events: events,
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
          <div>
            <Header 
              icon='group' 
              content={event.type === 'GroupInvite' ? 'Group Invite' : 'Something happended'}
              subheader='You have been invited to the group'
            />
            <Button.Group widths='2'>
              <Button onClick={() => this.handleActionClick({link: event.actionLink, type: 'decline'})} negative>Decline</Button>
              <Button onClick={() => this.handleActionClick({link: event.actionLink, type: 'accept'})} positive>Accept</Button>
            </Button.Group>
          </div>
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
        <Menu.Item>
          <Dropdown
            trigger={
              <Label>
                <Icon name='mail' /> {events.length}
              </Label>
            }
            options={opts} pointing='top left' icon={null} />
        </Menu.Item>
      );
  }
}
