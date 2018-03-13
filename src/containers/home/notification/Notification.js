import React, { Component } from 'react';
import { getNotifications, getEvents } from '../../../api';

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
    getNotifications()
      .then(notifications => {
        console.log(notifications);
        this.setState({
          notifications: notifications,
        })
      })
      .catch(err => this.setState({
        notifications: [],
      }))
      .finally(() => {
        this.setState({
          isLoading: false
        })
      })

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

  render() {
    const { isLoading, notifications, events } = this.state;
    
    return isLoading
      ? null
      : (
        <div>
          {
            notifications.length 
              ? notifications.map(notif => 
                  (
                    <div>
                      Notifs:
                      <p>{notif.type}</p>
                    </div>
                  )
                )
              : null
          }
          {
            events.map(event => 
              (
                <div>
                  Events:
                  <p>{event.type}</p>
                </div>
              )
            )
          }
        </div>
      );
  }
}
