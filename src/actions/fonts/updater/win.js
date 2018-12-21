import {
  appUserDir,
  localFontsDirPaths,
  fontRegExecPath
} from "../../../config";
import { runCmd } from "../../_utils";

const fs = window.require("fs");
const request = window.require("request");
const update = async font => {
  try {
    const localFontsDirPath = localFontsDirPaths.win;
    const fontStyles = font.fontStyles || [];
    const filesNames = [];
    const tmpFontPaths = [];
    const fontInstallingQueue = fontStyles.map(async ({ fontUrl }) => {
      const splittedUrl = fontUrl.split("/").reverse();
      filesNames.push(splittedUrl[0]);

      const fileName = fontUrl.substr(fontUrl.lastIndexOf("/") + 1);
      const pathToBeDownload = `${appUserDir}/${fileName}`;
      tmpFontPaths.push(pathToBeDownload);
      await new Promise(resolve =>
        request(fontUrl)
          .pipe(fs.createWriteStream(pathToBeDownload))
          .on("finish", resolve)
      );
    });

    await Promise.all(fontInstallingQueue);

    const filePaths = filesNames
      .map(fileName => `${localFontsDirPath}/${fileName}`)
      .join(" ");

    const cmd = `rm -rf ${filePaths} && ${fontRegExecPath}/FontReg.exe && cp ${fontRegExecPath}/FontReg.exe ${appUserDir}/ && ${appUserDir}FontReg.exe /move`;
    await runCmd(cmd);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export default update;
