import React from "react";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import { installFont, uninstallFont } from "../actions/fonts";

class AppContainer extends React.Component {
  state = {
    isUserRegistered: false,
    announcement: null,
    fonts: [],
    installedFonts: [],
    user: null,
    error: null,
    loading: true,
    registering: null
  };

  componentDidMount() {
    init(
      (error, { announcement, fonts, user, lastUpdated, isUserRegistered }) => {
        this.setState(() => ({
          announcement,
          fonts,
          user,
          lastUpdated,
          isUserRegistered,
          error,
          loading: false
        }));
      }
    );
  }

  registerUser = userObj => {
    this.setState({ registering: true });
    registerUser(userObj, (error, { isUserRegistered, user }) => {
      this.setState(() => ({
        user: { ...this.state.user, ...user },
        isUserRegistered,
        error,
        registering: false
      }));
    });
  };

  render() {
    return (
      <App
        {...this.state}
        registerUser={this.registerUser}
        installFont={installFont}
        uninstallFont={uninstallFont}
      />
    );
  }
}

export default AppContainer;
