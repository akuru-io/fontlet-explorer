import {localFontsDirPaths ,appUserDir } from "../../../config";
const sudo = window.require("sudo-prompt");



const windowsUninstaller = async (font, cb) => {
  const fontStyles = font.fontStyles || [];

  let fontReg = `${appUserDir}\\fontCache\\FontReg.exe`;

  const filesNames = fontStyles.map(({ fontUrl }) => {
    const splittedUrl = fontUrl.split("/").reverse();
    return splittedUrl[0];
  });

  const filePaths = filesNames
    .map(fileName => {
      
      return `${localFontsDirPaths.windows}/${fileName}`;
    })
    .join(" ");

  const options = { name: "fontlet", cachePassword: true };
  //delete font file from source
  sudo.exec(`Remove-Item –path ${filePaths}`, options, (error /* , stdout */) => {
    if (error) {
      cb({ message: "Uninstalling failed!", params: error }, null);
      return;
    }

    //refresh font cache using fontReg
    sudo.exec(
      `${fontReg}`,
      options,
      fontCopyError => {
        if (fontCopyError) {
          cb({ message: "unstalling failed!", params: fontCopyError }, null);
          return;
        }

     
      }
    );
  });
};

export default windowsUninstaller;
