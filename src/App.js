import { compose } from "recompose";

import { init } from "./actions";
import App from "./components/App";

init();

export default compose()(App);
