import React from "react";
import each from "lodash/each";

import App from "../components/App";

import init from "../actions/init";
import { registerUser } from "../actions/user";
import { installFont, uninstallFont, updateFont } from "../actions/fonts/index";

import Alert from "../utils/alert";

class AppContainer extends React.Component {
  state = {
    fonts: [],
    user: null,
    announcement: null,
    error: null,
    loading: true,
    registering: null
  };

  componentDidMount = async () => {
    try {
      const { announcements, fonts, user, lastUpdated } = await init();
      this.setState(() => ({
        announcement: announcements && announcements[0],
        fonts,
        user,
        lastUpdated,
        loading: false
      }));
    } catch (error) {
      this.setState(() => ({ error, loading: false }));
    }
  };

  setFontState = ({ id }, state) => {
    const { fonts } = this.state;
    each(fonts, (font, index) => {
      if (font.id === id) {
        each(Object.keys(state), key => {
          fonts[index][key] = state[key];
        });
      }
    });
    this.setState(() => ({ fonts }));
  };

  registerUser = async userToBeRegister => {
    this.setState(() => ({ registering: true }));
    try {
      const user = await registerUser(userToBeRegister);
      this.setState(() => ({ user, registering: false }));
    } catch (error) {
      this.setState(() => ({ error, registering: false }));
    }
  };

  installFont = async fontToBeInstalled => {
    this.setFontState(fontToBeInstalled, { installing: true });
    try {
      const font = await installFont(fontToBeInstalled);
      const { id, installing, installed, error } = font;
      this.setFontState({ id }, { id, installing, installed });
      if (!error) Alert.success(`${font.familyName} installed successfully!.`);
    } catch (error) {
      this.setFontState(fontToBeInstalled, { installing: false });
      Alert.error(`${fontToBeInstalled.familyName} installing failed!.`);
    }
  };

  uninstallFont = async fontToBeRemoved => {
    this.setFontState(fontToBeRemoved, { uninstalling: true });
    try {
      const font = await uninstallFont(fontToBeRemoved);
      const { id, uninstalling, installed, error } = font;
      this.setFontState({ id }, { id, uninstalling, installed });
      if (!error)
        Alert.success(`${font.familyName} uninstalled successfully!.`);
    } catch (error) {
      this.setFontState(fontToBeRemoved, { uninstalling: false });
      Alert.error(`${fontToBeRemoved.familyName} uninstalling failed!.`);
    }
  };

  updateFont = async fontToBeUpdate => {
    this.setFontState(fontToBeUpdate, { updating: true });
    try {
      const font = await updateFont(fontToBeUpdate);
      const { id, updating, installed, isUpdateAvailable, error } = font;
      this.setFontState({ id }, { id, updating, installed, isUpdateAvailable });
      if (!error) Alert.success(`${font.familyName} updated successfully!.`);
    } catch (error) {
      this.setFontState(fontToBeUpdate, { updating: false });
      Alert.error(`${fontToBeUpdate.familyName} updating failed!.`);
    }
  };

  render() {
    return (
      <App
        {...this.state}
        registerUser={this.registerUser}
        installFont={this.installFont}
        uninstallFont={this.uninstallFont}
        updateFont={this.updateFont}
      />
    );
  }
}

export default AppContainer;
