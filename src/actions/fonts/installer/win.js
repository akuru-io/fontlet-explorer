import { appUserDir, appRoot } from "../../../config";
import { removeLastDirPartOf } from "../../_utils";

// const sudo = window.require("sudo-prompt");
const fs = window.require("fs");
const request = window.require("request");


const winInstaller = async (font, cb) => {
  // TODO: IMPLEMENTS MULTI_FONTS INSTALL MECHANISM like in Mac/Lin methods ***
  const fontStyles = font.fontStyles || [];

  // create root folder to hold all fonts inside the app root
      if (!fs.existsSync(`${appUserDir}/fontCache/`)){
        fs.mkdirSync(`${appUserDir}/fontCache/`);  
      }
  // generate font temp folder name     
  const tempFolderName = '_' + Math.random().toString(36).substr(2, 9);
  

  // create temp folder to download font family
  const folderToBeDownload = `${appUserDir}/fontCache/${tempFolderName}/`
  if (!fs.existsSync(folderToBeDownload)){
    fs.mkdirSync(folderToBeDownload);  
  }

  // downoload all fonts to temp folder
  const fontInstallingQueue = await fontStyles.map(async ({ fontUrl }) => {
    const fileName = fontUrl.substr(fontUrl.lastIndexOf("/") + 1);
    const pathToBeDownload = `${folderToBeDownload}${fileName}`;
    console.log(33,pathToBeDownload)
    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on("finish", resolve)
    );
    return pathToBeDownload;
  });

  // script for install font in windows
  let resolveAppRoot = appRoot;
  let addFont = `${appRoot}\\src\\etc\\addFont.bat`;
  console.log("appRoot",appRoot)

  if (
    resolveAppRoot.substr(resolveAppRoot.lastIndexOf("\\") + 1) === "app.asar"
  ) {
    resolveAppRoot = removeLastDirPartOf(resolveAppRoot);
    resolveAppRoot = removeLastDirPartOf(resolveAppRoot.slice(0, -1));      
    addFont = `${resolveAppRoot}\\src\\etc\\addFont.bat`;
  }

  const fileNameOrfolder = folderToBeDownload;

    //Install
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
