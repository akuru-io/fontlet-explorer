const electron = require('electron');
const openAboutWindow = require('about-window').default;
const path = require('path');
const isDev = require('electron-is-dev');
const { autoUpdater } = require('electron-updater');

require('update-electron-app')();

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

autoUpdater.logger = require('electron-log');

autoUpdater.logger.transports.file.level = 'info';

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    resizable: false,
    icon: path.join(__dirname, '/about/about-icon.png')
  });
  mainWindow.loadURL(
    isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`
  );
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  
  // initAutoUpdate();
  autoUpdater.checkForUpdatesAndNotify();
  
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.once('ready', () => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'About',
      submenu: [
        {
          label: 'About Fontlet',
          click: () =>
            openAboutWindow({
              icon_path: `${app.getAppPath()}/about/about-icon.png`,
              css_path: `${app.getAppPath()}/about/about.css`,
              package_json_dir: __dirname,
              use_version_info: false,
              description:
                'Fontlet is a free software project led by a community who loves Free/Libre and Open source fonts. Initial development is supported by Mooniak, LeafyCode and HostGrid. Credits Kasun Indi, Kosala Senevirathne, Malith Widanapathirana, Pathum Egodawatta, Pubudu Kodikara, Rajitha Manamperi, Sachintha Kodagoda',
              copyright: 'Copyright (c) 2018',
              homepage: 'https://fontlet.app/'
            })
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
});
