import uninstall from "../uninstaller/win";
import install from "../installer/win";

const winUpdater = async (font, cb) => {
  // Uninstall font first
  uninstall(font, (uninsErr, uninsResp) => {
    if (uninsErr) {
      cb(null, {
        ...font,
        ...uninsResp,
        error: {
          message: "Updating failed!",
          params: uninsErr
        }
      });
      return;
    }

    // Update new version
    install(font, (insErr, insResp) => {
      if (insErr || insResp.error) {
        cb(null, {
          ...font,
          ...insResp,
          error: {
            message: "Updating failed!",
            params: insErr
          }
        });
        return;
      }

      cb(null, {
        ...font,
        ...insResp,
        isUpdateAvailable: false
      });
    });
  });
};

export default winUpdater;
