const electron = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const notifier = require('node-notifier');
const { autoUpdater } = require('electron-updater');
require('update-electron-app')();

const { app, BrowserWindow } = electron;

let mainWindow;
console.log(path.join(__dirname, 'src/assets/images/fontcase-icon.png'));
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    resizable: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png')
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  initAutoUpdate();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

function initAutoUpdate() {
  if (isDev) {
    return;
  }

  if (process.platform === 'linux') {
    return;
  }

  autoUpdater.checkForUpdates();
  autoUpdater.signals.updateDownloaded(showUpdateNotification);
}

function showUpdateNotification(update) {
  const updateInfo = update || {};
  const restartNowAction = 'Restart now';

  const versionLabel = updateInfo.label ? `Version ${updateInfo.version}` : 'The latest version';

  notifier.notify(
    {
      title: 'A new update is ready to install.',
      message:
        `${versionLabel}` +
        'has been downloaded and will be automatically installed after restart.',
      closeLabel: 'Okay',
      actions: restartNowAction
    },
    (err, response, metadata) => {
      if (err) throw err;
      if (metadata.activationValue !== restartNowAction) {
        return;
      }
      autoUpdater.quitAndInstall();
    }
  );
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
