import React, { Component } from 'react';
import Auth from './containers/auth/Auth';
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Auth />
      </Router>
    );
  }
}

export default App;
