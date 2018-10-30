import darwinUpdater from "./darwin";
import winUpdater from "./win";
import linuxUpdater from "./linux";

const update = {
  win: winUpdater,
  darwin: darwinUpdater,
  linux: linuxUpdater
};

export default update;
