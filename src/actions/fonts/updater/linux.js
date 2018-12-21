import { appUserDir, localFontsDirPaths } from "../../../config";
import { runCmd } from "../../_utils";

const fs = window.require("fs");
const request = window.require("request");

const update = async font => {
  try {
    const localFontsDirPath = localFontsDirPaths.linux;
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

    const fontsFilePath = tmpFontPaths
      .map(p => p.replace(" ", "\\ "))
      .join(" "); // TODO: Improve

    const cmd = `rm -rf ${filePaths} && c-cache -f -v && mkdir -p ${localFontsDirPath} && cp ${fontsFilePath} ${localFontsDirPath} && fc-cache -f -v`;
    await runCmd(cmd);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export default update;
