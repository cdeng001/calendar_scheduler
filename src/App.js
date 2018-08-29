import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarForm from './CalendarForm/CalendarForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CalendarForm/>
      </div>
    );
  }
}

export default App;
