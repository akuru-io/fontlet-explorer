import React, { Component } from 'react';
import Welcome from './Welcome';
import Gallery from './Gallery';

import db from '../lib/db/store';
import dbFonts from '../lib/db/fonts';

import fonts from '../data/fonts';

const Loading = () => (
  <div className="bp3-progress-bar bp3-intent-primary">
    <div className="bp3-progress-meter" />
  </div>
);
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
          error: 'Oops!.. Something wrong in database connetion.'
        });
        return;
      }

      const { intialized } = resp[0] || {};

      if (!intialized) {
        // Update fonts collection
        fonts.forEach(font => {
          dbFonts.insert(
            {
              type: 'fonts',
              id: font.id,
              installed: false
            },
            errInit => {
              if (errInit) {
                this.setState({
                  error: 'Oops!.. Initializing failed!'
                });
              }
              return;
            }
          );
        });
      }

      this.setState({
        registeredUser: intialized,
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

  skipButtonFunction = () => {
    db.update(
      { type: 'init' },
      { type: 'init', userEmail: null, intialized: true },
      (err, resp) => {
        if (err) {
          const Alert = new Notification('Error!', {
            body: 'Initializing failed!'
          });
          /* eslint-enable no-unused-vars */

          return;
        }
        this.setState({ registeredUser: true });
      }
    );
  };

  render() {
    const { registeredUser, loading, error } = this.state;

    if (error) return <ErrorView error={error} />;
    if (loading) return <Loading />;

    return (
      <div>
        {!registeredUser && (
          <Welcome registerUser={this.registerUser} skipButtonFunction={this.skipButtonFunction} />
        )}
        {registeredUser && <Gallery />}
      </div>
    );
  }
}

export default App;
