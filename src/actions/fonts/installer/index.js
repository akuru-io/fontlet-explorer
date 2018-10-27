import darwinInstaller from "./darwin";
import winInstaller from "./win";
import linuxInstaller from "./linux";

const install = {
  Win: winInstaller,
  Darwin: darwinInstaller,
  Linux: linuxInstaller
};

export default install;
