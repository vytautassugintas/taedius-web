import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Button, Form } from 'semantic-ui-react'
import './SignUpForm.css';

class SignUpForm extends Component {
  render() {
    return (
      <Form className='margin-top--md'>
        <Form.Field>
          <label>Name</label>
          <input type='text' />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input type='email' />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type='password' />
        </Form.Field>
        <Button type='submit' fluid primary>Sign Up</Button>
        <p className='text--center'>Already have account? <Link to="/login">Log in</Link></p>
      </Form>
    );
  }
}

export default SignUpForm;
