import darwinUninstaller from "./darwin";
import winUninstaller from "./win";
import linuxUninstaller from "./linux";

const uninstall = {
  Win: winUninstaller,
  Darwin: darwinUninstaller,
  Linux: linuxUninstaller
};

export default uninstall;
