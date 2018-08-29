import React, { Component } from 'react';
import Welcome from './Welcome';
import Gallery from './Gallery';

import db from '../libs/db';

const Loading = () => <div>Loading...</div>;
const ErrorView = error => <div>{error}</div>;

class App extends Component {
  constructor() {
    super();

    this.state = {
      registeredUser: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    db.find({ type: 'init' }, (err, resp) => {
      if (err) {
        this.setState({
          error: 'Database connetion error.'
        });
        return;
      }

      const { intialized, userEmail } = resp[0] || {};
      this.setState({
        registeredUser: intialized && userEmail,
        loading: false
      });
    });
  }

  registerUser = userEmail => {
    if (!userEmail) {
      /* eslint-disable no-unused-vars */
      const Alert = new Notification('Error!', {
        body: 'Invalid E-mail!'
      });

      return;
    }

    db.update({ type: 'init' }, { type: 'init', userEmail, intialized: true }, (err, resp) => {
      if (err) {
        const Alert = new Notification('Error!', {
          body: 'User registration failed!'
        });
        /* eslint-enable no-unused-vars */

        return;
      }
      this.setState({ registeredUser: true });
    });
  };

  render() {
    const { registeredUser, loading, error } = this.state;

    if (error) return <ErrorView error={error} />;
    if (loading) return <Loading />;

    return (
      <div>
        {!registeredUser && <Welcome registerUser={this.registerUser} />}
        {registeredUser && <Gallery />}
      </div>
    );
  }
}

export default App;
