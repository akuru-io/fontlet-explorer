import React, { Component } from 'react';
import Welcome from "./Welcome";
import Gallery from "./Gallery";

class App extends Component {
  constructor() {
    super();

    this.state = {
      registeredUser: null
    };
  }

  registerUser = (userEmail) => {
    console.log("= ", userEmail);
    this.setState({ registeredUser: true });
  }

  render() {
    const { registeredUser } = this.state;

    return (
      <div>
        {!registeredUser && (<Welcome registerUser={this.registerUser} />)}
        {registeredUser && (<Gallery />)}
      </div>
    );
  }
}

export default App;
