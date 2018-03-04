import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import { postLogin } from '../../api';

import './LoginForm.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      redirectHome: false
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
        console.log(succes);
        this.setState({redirectHome: true});
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {redirectHome} = this.state;

    if (redirectHome) {
      return <Redirect to='/home' />;
    }

    return (
      <Form className='margin-top--md'>
        <Form.Field>
          <label>Email</label>
          <input name='email' type='text' value={this.state.email} onChange={this.handleInputChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input name='password' value={this.state.password} onChange={this.handleInputChange} type='password' />
        </Form.Field>
        <Button 
          onClick={this.handleSubmit}
          type='submit' 
          fluid primary>
            Log In
        </Button>
        <p className='text--center'>Not a member? <Link to="/signup">Sign Up</Link></p>
      </Form>
    );
  }
}

export default LoginForm;
