import { appUserFolder, appRoot, removeLastDirectoryPartOf } from "./core";

export default filePath => {
  const fileName = filePath.substr(filePath.lastIndexOf("\\") + 1);
  const pathToBeDownload = `${appUserFolder}\\${fileName}`; // TODO add folde name font to
  // save downloaded fonts

  // script for install font in windows
  let resolveAppRoot = appRoot;
  let removeFont = `${appRoot}\\src\\lib\\removeFont.bat`;
  // resolve for build
  if (
    resolveAppRoot.substr(resolveAppRoot.lastIndexOf("\\") + 1) === "app.asar"
  ) {
    resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot);
    resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
    removeFont = `${resolveAppRoot}\\src\\lib\\removeFont.bat`;
  }

  const fileNameOrfolder = pathToBeDownload;

  function windowsFontUnstaller() {
    const { spawn } = window.require("child_process");

    const ls = spawn("cmd.exe", ["/c", removeFont, fileNameOrfolder]); // run script font
    // add bat script

    /* eslint-disable */
    ls.stdout.on("data", data => {
      console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
      console.log(`stderr: ${data}`);
    });

    ls.on("exit", code => {
      console.log(`child process exited with code ${code}`);
    });
    /* eslint-enable */
  }

  windowsFontUnstaller();
};
