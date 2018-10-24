import React from "react";
import ReactDOM from "react-dom";

import { init } from "./actions";
import App from "./App";
// import registerServiceWorker from './registerServiceWorker';

import "./index.css";
import "./assets/styles/fonts.css";

init();
ReactDOM.render(<App />, document.getElementById("root"));

// registerServiceWorker();
