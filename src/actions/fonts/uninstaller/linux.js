const sudo = window.require("sudo-prompt");

const linuxUninstaller = async (font, cb) => {
  const fontStyles = font.fontStyles || [];

  const filesNames = fontStyles.map(({ fontUrl }) => {
    const splittedUrl = fontUrl.split("/").reverse();
    return splittedUrl[0];
  });

  const filePaths = filesNames
    .map(fileName => {
      const localFontsDirPath = "~/.fonts";
      return `${localFontsDirPath}/${fileName}`;
    })
    .join(" ");

  const options = { name: "fontlet", cachePassword: true };
  sudo.exec(`rm -rf ${filePaths}`, options, (error /* , stdout */) => {
    if (error) {
      cb({ message: "Uninstalling failed!", params: error }, null);
      return;
    }

    sudo.exec(`fc-cache -f -v`, options, () => {
      // if (fCacheError) {
      //   cb(fCacheError, null);
      //   return;
      // }
      cb(null, true);
    });
  });
};

export default linuxUninstaller;
