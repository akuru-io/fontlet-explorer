import { get } from "../utils/request";
import Database from "../utils/database";
import { FL_RESOURCE_URL, resourceDirPath } from "../config";

// Database conn.
const configDb = new Database(`${resourceDirPath}\\configDb`);
const fontsDb = new Database(`${resourceDirPath}\\fontsDb`);

let isInitialConfigDone = null;

export const init = () => {
  // Initializing..
  configDb.findOne({ type: "INIT" }, (err, resp) => {
    if (err) console.log("Error Initializing");
    console.log("== ", resp);
  });

  get(FL_RESOURCE_URL).then(response => {
    console.log("* ", response)
  }).catch(error => {
    console.log("- ", error)
  })
};
