import uninstall from "../uninstaller/win";
import install from "../installer/win";

const update = async font => {
  try {
    await uninstall(font);
    await install(font);
    return font;
  } catch (error) {
    throw new Error(error);
  }
};

export default update;
