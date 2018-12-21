import React from "react";
import filter from "lodash/filter";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import { installFont, uninstallFont, updateFont } from "../actions/fonts/index";

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
          announcements,
          fonts,
          installedFonts,
          flags,
          user,
          lastUpdated,
          isUserRegistered
        }
      ) => {
        this.setState(() => ({
          announcement: announcements && announcements[0],
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

  install = async font => {
    this.setFlag(font, true);
    try {
      const installedFont = await installFont(font);
      this.setState({
        // eslint-disable-next-line
        installedFonts: [...this.state.installedFonts, installedFont]
      });
      this.setFlag(font, false);
      Alert.success(`${font.familyName} installed successfully!.`);
    } catch (error) {
      // this.setState({ error });
      this.setFlag(font, false);
      Alert.error(`${font.familyName} installing failed!.`);
    }
  };

  uninstall = async font => {
    this.setFlag(font, true);
    try {
      const uninstalledFont = await uninstallFont(font);
      this.setState({
        installedFonts: filter(
          // eslint-disable-next-line
          this.state.installedFonts,
          f => f.id !== uninstalledFont.id
        )
      });
      this.setFlag(font, false);
      Alert.success(`${font.familyName} uninstalled successfully!.`);
    } catch (error) {
      // this.setState({ error });
      this.setFlag(font, false);
      Alert.error(`${font.familyName} uninstalling failed!.`);
    }
  };

  update = async font => {
    this.setFlag(font, true);
    try {
      const updatedFont = await updateFont(font);

      // Remove older version
      const installedFonts = filter(
        // eslint-disable-next-line
        this.state.installedFonts,
        f => f.id !== updatedFont.id
      );
      // Update new version
      installedFonts.push(updatedFont);
      this.setState({
        installedFonts, // eslint-disable-next-line
        fonts: this.state.fonts.map(f => {
          return {
            ...f,
            isUpdateAvailable:
              f.id === updatedFont.id ? false : f.isUpdateAvailable
          };
        })
      });

      this.setFlag(font, false);
      Alert.success(`${font.familyName} updated successfully!.`);
    } catch (error) {
      // this.setState({ error });
      this.setFlag(font, false);
      Alert.error(`${font.familyName} updating failed!.`);
    }
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
