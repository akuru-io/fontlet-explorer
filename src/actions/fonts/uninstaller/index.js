import darwinUninstaller from "./darwin";
import winUninstaller from "./win";
import linuxUninstaller from "./linux";

const uninstall = {
  win: winUninstaller,
  darwin: darwinUninstaller,
  linux: linuxUninstaller
};

export default uninstall;
