import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/fonts.css';
import Welcome from './containers/Welcome';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
