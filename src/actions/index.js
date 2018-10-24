import { get } from "../utils/request";
import { FL_RESOURCE_URL } from "../config";

import Alert from "../utils/alerts";

export const init = () => {
  get(FL_RESOURCE_URL).then(response => {
    console.log("* ", response)
  }).catch(error => {
    console.log("- ", error)
  })
};
