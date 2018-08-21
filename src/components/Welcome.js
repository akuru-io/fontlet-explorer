import React, { Component } from 'react';

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Welcome extends Component {
  state = { userEmail: "" };

  handleChange = (evt) => {
    this.setState({
      userEmail: evt.target.value
    });
  }

  registerUser = () => {
    const { userEmail } = this.state;

    if (validateEmail(userEmail)) {
      this.props.registerUser(userEmail);
    } else {
      alert("Invalid e-mail!");
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to fontcase</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed semper magna, vitae auctor nisi. Pellentesque eleifend est in nisi euismod faucibus. Praesent facilisis elementum sapien id pulvinar. Vestibulum ut finibus ex. Vivamus elementum massa et diam sollicitudin, eget interdum erat volutpat. Duis porttitor massa sapien, vitae blandit magna venenatis nec. Nullam pulvinar, magna vel convallis auctor, dui ex lacinia nisi, a porttitor elit risus ac ex.</p>
      
        <p>Please continue by entering your e-mail.</p>

        <input type="text" name="email" value={this.state.userEmail} onChange={this.handleChange} placeholder="eg. john.doe@example.com" />

        <button onClick={this.registerUser}>Continue</button>
      </div>
    );
  }
}

export default Welcome;
