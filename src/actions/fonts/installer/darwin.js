import { appUserDir, localFontsDirPaths } from "../../../config";
import { addInstalledFontToLocalCache } from "../_utils";

const sudo = window.require("sudo-prompt");
const fs = window.require("fs");
const request = window.require("request");

const darwinInstaller = async (font, cb) => {
  const fontStyles = font.fontStyles || [];
  const fontInstallingQueue = fontStyles.map(async ({ fontUrl }) => {
    const fileName = fontUrl.substr(fontUrl.lastIndexOf("/") + 1);
    const pathToBeDownload = `${appUserDir}/${fileName}`;

    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on("finish", resolve)
    );
    return pathToBeDownload;
  });

  Promise.all(fontInstallingQueue).then(paths => {
    const fontsFilePath = paths.map(path => path.replace(" ", "\\ ")).join(" ");
    const localFontsDirPath = localFontsDirPaths.darwin;

    const options = {
      name: "fontlet",
      cachePassword: true
    };
    sudo.exec(`cp ${fontsFilePath} ${localFontsDirPath}`, options, error => {
      if (error) {
        cb(null, {
          ...font,
          installed: false,
          installing: false,
          error: {
            message: `${font.familyName} installing failed!.`,
            params: error
          }
        });
        return;
      }

      // Update localCache
      addInstalledFontToLocalCache(font, lcError => {
        if (lcError) {
          cb(null, {
            ...font,
            installed: false,
            installing: false,
            error: lcError
          });
          return;
        }
        cb(null, {
          ...font,
          installed: true,
          installing: false,
          error: null
        });
      });
    });
  });
};

export default darwinInstaller;
