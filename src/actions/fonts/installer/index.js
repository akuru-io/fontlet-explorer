import darwinInstaller from "./darwin";
import winInstaller from "./win";
import linuxInstaller from "./linux";

const install = {
  win: winInstaller,
  darwin: darwinInstaller,
  linux: linuxInstaller
};

export default install;
