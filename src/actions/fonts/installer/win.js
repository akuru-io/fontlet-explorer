import { appUserDir, appRoot } from "../../../config";
import { removeLastDirPartOf } from "../../_utils";

// const sudo = window.require("sudo-prompt");
const fs = window.require("fs");
const request = window.require("request");
// const { exec } = window.require("child_process");

const winInstaller = async (font, cb) => {
  // TODO: IMPLEMENTS MULTI_FONTS INSTALL MECHANISM like in Mac/Lin methods ***
  const fontStyles = font.fontStyles || [];
  const { fontUrl } = fontStyles[0];

  // get filename
  const fileName = fontUrl.substr(fontUrl.lastIndexOf("/") + 1);

  const pathToBeDownload = `${appUserDir}\\${fileName}`; // TODO add folde name
  // font to save downloaded fonts
  // download font file to user app directory
  await new Promise(resolve =>
    request(fontUrl)
      .pipe(fs.createWriteStream(pathToBeDownload))
      .on("finish", resolve)
  );

  // script for install font in windows
  let resolveAppRoot = appRoot;
  let addFont = `${appRoot}\\src\\etc\\addFont.bat`;

  if (
    resolveAppRoot.substr(resolveAppRoot.lastIndexOf("\\") + 1) === "app.asar"
  ) {
    resolveAppRoot = removeLastDirPartOf(resolveAppRoot);
    resolveAppRoot = removeLastDirPartOf(resolveAppRoot.slice(0, -1));
    addFont = `${resolveAppRoot}\\src\\etc\\addFont.bat`;
  }

  const fileNameOrfolder = pathToBeDownload;

  // Install
  const { spawn } = window.require("child_process");
  const ls = spawn("cmd.exe", ["/c", addFont, fileNameOrfolder]); // run script font add bat script

  ls.stdout.on("data", data => {
    cb(null, data);
  });

  ls.stderr.on("data", data => {
    cb({ message: "Installing failed!", params: data }, null);
  });

  ls.on("exit", code => {
    cb({ message: "Installing failed!", params: code }, null);
  });
};

export default winInstaller;
