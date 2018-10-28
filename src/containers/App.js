import React from "react";
import filter from "lodash/filter";
import each from "lodash/each";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import {
  installFont,
  uninstallFont,
  addInstalledFontToLocalCache,
  removeInstalledFontFromLocalCache
} from "../actions/fonts/index";
import Alert from "../libs/alert";

class AppContainer extends React.Component {
  state = {
    isUserRegistered: false,
    announcement: null,
    fonts: [],
    installedFonts: [],
    user: null,
    error: null,
    flags: {},
    loading: true,
    registering: null
  };

  componentDidMount() {
    init(
      (
        error,
        { announcement, fonts, flags, user, lastUpdated, isUserRegistered }
      ) => {
        this.setState(() => ({
          announcement,
          fonts,
          flags,
          user,
          lastUpdated,
          isUserRegistered,
          error,
          loading: false
        }));
      }
    );

    // set flags (false)
    setTimeout(() => {
      const { flags } = this.state;
      each(flags, (val, key) => {
        flags[key] = !val;
      });
      this.setState(() => ({ flags }));
    }, 500);
  }

  setFlag = ({ id }, status) => {
    const { flags } = this.state;
    flags[id] = status;
    this.setState(flags);
  };

  registerUser = userObj => {
    this.setState({ registering: true });
    registerUser(userObj, (error, { isUserRegistered, user }) => {
      this.setState(() => ({
        // eslint-disable-next-line
        user: { ...this.state.user, ...user },
        isUserRegistered,
        error,
        registering: false
      }));
    });
  };

  installFont = font => {
    this.setFlag(font, true);
    installFont(font, error => {
      if (error) {
        this.setState({ error });
        this.setFlag(font, false);
        return;
      }

      // Update localCache
      addInstalledFontToLocalCache(font, lCError => {
        if (lCError) {
          this.setState({ error });
          this.setFlag(font, false);
          Alert.error(`${font.familyName} installing failed!.`);
          return;
        }

        this.setState({
          // eslint-disable-next-line
          installedFonts: [...this.state.installedFonts, font]
        });
        this.setFlag(font, false);

        Alert.success(`${font.familyName} installed successfully!.`);
      });
    });
  };

  uninstallFont = font => {
    this.setFlag(font, true);
    uninstallFont(font, error => {
      if (error) {
        this.setState({ error });
        this.setFlag(font, false);
        return;
      }

      // Update localCache
      removeInstalledFontFromLocalCache(font, lCError => {
        if (lCError) {
          this.setState({ error });
          this.setFlag(font, false);
          Alert.error(`${font.familyName} uninstalling failed!.`);
          return;
        }

        this.setState({
          installedFonts: filter(
            // eslint-disable-next-line
            this.state.installedFonts,
            f => f.id !== font.id
          )
        });
        this.setFlag(font, false);

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
