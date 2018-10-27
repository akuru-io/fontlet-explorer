import React from "react";
import filter from "lodash/filter";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import {
  installFont,
  uninstallFont,
  addInstalledFontToLocalCache,
  removeInstalledFontFromLocalCache
} from "../actions/fonts/index";
import Alert from "../utils/alert";

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

  installFont = font => {
    installFont(font, error => {
      if (error) {
        this.setState({
          error
        });
        return;
      }

      // Update localCache
      addInstalledFontToLocalCache(font, lCError => {
        if (lCError) {
          this.setState({
            error
          });
          Alert.error(`${font.familyName} installing failed!.`);
          return;
        }

        this.setState({
          installedFonts: [...this.state.installedFonts, font]
        });

        Alert.success(`${font.familyName} installed successfully!.`);
      });
    });
  };

  uninstallFont = font => {
    uninstallFont(font, error => {
      if (error) {
        this.setState({
          error
        });
        return;
      }

      // Update localCache
      removeInstalledFontFromLocalCache(font, lCError => {
        if (lCError) {
          this.setState({
            error
          });
          Alert.error(`${font.familyName} uninstalling failed!.`);
          return;
        }

        this.setState({
          installedFonts: filter(
            this.state.installedFonts,
            f => f.id !== font.id
          )
        });

        Alert.success(`${font.familyName} unstalled successfully!.`);
      });
    });
  };

  render() {
    return (
      <App
        {...this.state}
        registerUser={this.registerUser}
        installFont={this.installFont}
        uninstallFont={this.uninstallFont}
      />
    );
  }
}

export default AppContainer;
