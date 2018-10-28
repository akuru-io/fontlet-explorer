import React from "react";
import filter from "lodash/filter";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import {
  installFont,
  uninstallFont,
  updateFont,
  addInstalledFontToLocalCache,
  removeUninstalledFontFromLocalCache,
  updateInstalledFontToLocalCache
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
        {
          announcement,
          fonts,
          installedFonts,
          flags,
          user,
          lastUpdated,
          isUserRegistered
        }
      ) => {
        this.setState(() => ({
          announcement,
          fonts,
          installedFonts,
          flags,
          user,
          lastUpdated,
          isUserRegistered,
          error,
          loading: false
        }));
      }
    );
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

  install = font => {
    this.setFlag(font, true);
    installFont(font, error => {
      if (error) {
        // this.setState({ error });
        this.setFlag(font, false);
        return;
      }

      // Update localCache
      addInstalledFontToLocalCache(font, lCError => {
        if (lCError) {
          this.setState({ error: lCError });
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

  update = font => {
    this.setFlag(font, true);
    // Uninstall the font first.
    updateFont(font, error => {
      if (error) {
        // this.setState({ error });
        this.setFlag(font, false);
        Alert.error(`${font.familyName} updating failed!.`);
        return;
      }

      // Update localCache
      updateInstalledFontToLocalCache(font, lCError => {
        if (lCError) {
          this.setState({
            error: lCError
          });
          this.setFlag(font, false);
          Alert.error(`${font.familyName} updating failed!.`);
          return;
        }

        // Remove older version
        const installedFonts = filter(
          // eslint-disable-next-line
          this.state.installedFonts,
          f => f.id !== font.id
        );
        // Update new version
        installedFonts.push(font);
        this.setState({
          installedFonts
        });
        this.setFlag(font, false);
        Alert.success(`${font.familyName} updated successfully!.`);
      });
    });
  };

  uninstall = font => {
    this.setFlag(font, true);
    uninstallFont(font, error => {
      if (error) {
        // this.setState({ error });
        this.setFlag(font, false);
        Alert.error(`${font.familyName} uninstalling failed!.`);
        return;
      }

      // Update localCache
      removeUninstalledFontFromLocalCache(font, lCError => {
        if (lCError) {
          this.setState({ error: lCError });
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
        Alert.success(`${font.familyName} uninstalled successfully!.`);
      });
    });
  };

  render() {
    return (
      <App
        {...this.state}
        registerUser={this.registerUser}
        installFont={this.install}
        uninstallFont={this.uninstall}
        updateFont={this.update}
      />
    );
  }
}

export default AppContainer;
