import { appUserDir, appRoot,localFontsDirPaths } from "../../../config";
import { removeLastDirPartOf } from "../../_utils";

// const sudo = window.require("sudo-prompt");
const sudo = window.require("sudo-prompt");
const request = window.require("request");
const fs = window.require("fs");

const { exec } = window.require("child_process");


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

  
  Promise.all(fontInstallingQueue).then(paths => {
    const fontsFilePath = paths.join(" ");
    const localFontsDirPath = localFontsDirPaths.windows;

    const options = { name: "fontlet", cachePassword: true };

    // TODO: xx
    exec(`mkdir -p ${localFontsDirPath}`, {}, error => {
      if (error) {
        cb({ message: "Installing failed!", params: error }, null);
        return;
      }

      exec(
        `cp ${fontsFilePath} ${localFontsDirPath}`,
        options,
        fontCopyError => {
          if (fontCopyError) {
            cb({ message: "Installing failed!", params: fontCopyError }, null);
            return;
          }

          sudo.exec(`fc-cache -f -v`, options, (fCacheError, fCacheStdout) => {
            if (fCacheError) {
              cb({ message: "Installing failed!", params: fCacheError }, null);
              return;
            }
            cb(null, fCacheStdout);
          });
        }
      );
    });
  });


};

export default winInstaller;
