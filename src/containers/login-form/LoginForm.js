import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Form, Container, Message } from 'semantic-ui-react'
import { postLogin } from '../../api';

import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      redirectHome: false,
      errors: []
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleSubmit = () => {
    postLogin(this.state)
      .then(succes => {
        this.setState({redirectHome: true});
      })
      .catch(e => {
        this.setState({errors: e.errors});
      })
  }

  render() {
    const {redirectHome, errors} = this.state;

    if (redirectHome) {
      return <Redirect to='/home' />;
    }

    return (
      <Container>
        <Form className='margin-top--md'>
          <Form.Field>
            <label>Email</label>
            <Form.Input 
              name='email'
              type='text'
              value={this.state.email}
              onChange={this.handleInputChange}
              error={errors.some(e => e.param === 'email')}
            />
            <Error error={errors.filter(e => e.param === 'email')}/>
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input 
              name='password'
              type='password'
              value={this.state.password}
              onChange={this.handleInputChange}
              error={errors.some(e => e.param === 'password')}
            />
            <Error error={errors.filter(e => e.param === 'password')}/>
          </Form.Field>
          { errors.some(e => e.type === 'general') 
            ? <Message
                negative
                header='Whoops! Something went wrog'
                content={errors.filter(e => e.type === 'general')[0].msg}
              />
            : null
          }
          <Button 
            onClick={this.handleSubmit}
            type='submit' 
            fluid primary>
              Log In
          </Button>
          <p className='text--center'>Not a member? <Link to="/signup">Sign Up</Link></p>
        </Form>
      </Container>
    );
  }
}

const Error = ({error = []}) => {
  return error.length ? <span className='error--text'>{error[0].msg}</span> : null;
}

export default LoginForm;
