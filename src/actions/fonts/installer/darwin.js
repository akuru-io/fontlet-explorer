import { appUserDir } from "../../../config";

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
    const localFontsDirPath = "~/Library/Fonts/";

    const options = {
      name: "fontcase",
      cachePassword: true
    };
    sudo.exec(
      `cp ${fontsFilePath} ${localFontsDirPath}`,
      options,
      (error, stdout) => {
        if (error) {
          cb({ message: "Installing failed!", params: error }, null);
          return;
        }

        cb(null, { stdout });
      }
    );
  });
};

export default darwinInstaller;
