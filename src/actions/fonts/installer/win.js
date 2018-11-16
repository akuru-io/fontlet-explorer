import { appUserDir, appRoot,localFontsDirPaths } from "../../../config";


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

      



   // downoload all fonts to temp folder
  const fontInstallingQueue = await fontStyles.map(async ({ fontUrl }) => {
    const fileName = fontUrl.substr(fontUrl.lastIndexOf("/") + 1);
    const pathToBeDownload = `${appUserDir}/fontCache/${fileName}`;

    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on("finish", resolve)
    );
    return pathToBeDownload;
  });

  // script for install font in windows
  let resolveAppRoot = appRoot;

  let fontReg = `${appUserDir}\\fontCache\\FontReg.exe`;
  console.log("appRoot",appRoot)
  

  const options = { name: "fontlet", cachePassword: true };
  // install font using fontReg.exe
    sudo.exec(
        ` ${fontReg} /copy`,
        options,
        fontCopyError => {
          if (fontCopyError) {
            cb({ message: "Installing failed!", params: fontCopyError }, null);
            return;
          }
     
        }
      );
  



};

export default winInstaller;
