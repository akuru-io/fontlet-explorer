import { appUserDir, localFontsDirPaths } from "../../../config";
import { runCmd } from "../../_utils";

const fs = window.require("fs");
const request = window.require("request");

const install = async font => {
  try {
    const fontStyles = font.fontStyles || [];
    const tmpFontPaths = [];
    const fontInstallingQueue = fontStyles.map(async ({ fontUrl }) => {
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

    const fontsFilePath = tmpFontPaths
      .map(p => p.replace(" ", "\\ "))
      .join(" "); // TODO: Improve
    const localFontsDirPath = localFontsDirPaths.darwin;
    await runCmd(`cp ${fontsFilePath} ${localFontsDirPath}`);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export default install;
