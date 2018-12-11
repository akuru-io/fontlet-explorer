import { appUserDir, appRoot } from "../../../config";
import { removeLastDirPartOf } from "../../_utils";

const sudo = window.require("sudo-prompt");
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

 

  //const { spawn } = window.require("child_process");
  //const ls = spawn("cmd.exe", ["/c", addFont, fileNameOrfolder]); // run script font add bat script

  var options = {
    name: 'Fontlet'
  };

  sudo.exec(("cmd.exe /c "+ addFont + " " +  fileNameOrfolder), options, 
  function(error, stdout, stderr) {
    if (error) throw error;

  //  if(stderr) console.log('stderr: ' + stderr);
   // console.log('stdout: ' + stdout);

   
   if(stderr) cb({ message: "Installing failed!", params: stderr }, null);
   if(stdout) cb(null, stdout);
    
   console.log(stderr);
   console.log(stdout);
  }
); 
};

export default winInstaller;
