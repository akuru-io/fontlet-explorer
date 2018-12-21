import uninstall from "../uninstaller/linux";
import install from "../installer/linux";

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
