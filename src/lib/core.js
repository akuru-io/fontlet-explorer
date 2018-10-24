const { remote } = window.require("electron");

const { app } = remote;

// get the user folder of application
export const appRoot = app.getAppPath();
export const appUserFolder = app.getPath("userData");

// url remove last part
export const removeLastDirectoryPartOf = theUrl => {
  const theArr = theUrl.split("\\");
  theArr.pop();
  return theArr.join("\\");
};
