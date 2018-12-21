import { localFontsDirPaths } from "../../../config";
import { runCmd } from "../../_utils";

const uninstall = async font => {
  try {
    const fontStyles = font.fontStyles || [];
    const filesNames = fontStyles.map(({ fontUrl }) => {
      const splittedUrl = fontUrl.split("/").reverse();
      return splittedUrl[0];
    });
    const filePaths = filesNames
      .map(fileName => {
        const localFontsDirPath = localFontsDirPaths.darwin;
        return `${localFontsDirPath}/${fileName}`;
      })
      .join(" ");

    await runCmd(`rm -rf ${filePaths}`);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export default uninstall;
