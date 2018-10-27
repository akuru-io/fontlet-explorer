const sudo = window.require("sudo-prompt");

const darwinUninstaller = async (font, cb) => {
  const fontStyles = font.fontStyles || [];

  const filesNames = fontStyles.map(({ fontUrl }) => {
    const splittedUrl = fontUrl.split("/").reverse();
    return splittedUrl[0];
  });

  const filePaths = filesNames
    .map(fileName => {
      const localFontsDirPath = "~/Library/Fonts/";
      return `${localFontsDirPath}/${fileName}`;
    })
    .join(" ");

  const options = {
    name: "fontcase",
    cachePassword: true
  };
  sudo.exec(`rm -rf ${filePaths}`, options, (error, stdout) => {
    if (error) {
      cb({ message: "Uninstalling failed!", params: error }, null);
      return;
    }

    cb(null, { stdout });
  });
};

export default darwinUninstaller;
