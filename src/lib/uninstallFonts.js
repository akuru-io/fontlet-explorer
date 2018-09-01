import { appUserFolder, appRoot, removeLastDirectoryPartOf } from './core';

const os = window.require('os');
const sudo = window.require('sudo-prompt');

async function lin(filesNames, cb) {
  const filePaths = filesNames.map((fileName) => {
    const localFontsDirPath = '~/.fonts';
    return `${localFontsDirPath}/${fileName}`;
  }).join(" ");

  const options = {
    name: 'fontcase',
    cachePassword: true
  };
  sudo.exec(`rm -rf ${filePaths}`, options, (error, stdout) => {
    if (error) {
      cb(error, null);
      return;
    }

    sudo.exec(`fc-cache -f -v`, options, () => {
      // if (fCacheError) {
      //   cb(fCacheError, null);
      //   return;
      // }
      cb(null, true);
    });
  });
}

async function mac(filesNames, cb) {
  const filePaths = filesNames.map((fileName) => {
    const localFontsDirPath = '~/Library/Fonts/';
    return `${localFontsDirPath}/${fileName}`;
  }).join(" ");

  const options = {
    name: 'fontcase',
    cachePassword: true
  };
  sudo.exec(`rm -rf ${filePaths}`, options, (error, stdout) => {
    if (error) {
      cb(error, null);
      return;
    }

    cb(null, { stdout });
  });
}

export default async (font, cb) => {
  const { list } = font;
  const filesNames = list.map(url => {
    const splittedUrl = url.split("/").reverse();
    return splittedUrl[0];
  });

  if (os.type() === 'Windows_NT') {
    // TODO
    // Implements a windows uninstaller
    cb(null, true);
  } else if (os.type() === 'Linux' || os.type() === 'linux') {
    lin(filesNames, err => {
      if (err) {
        cb(true, null);
        return;
      }
      cb(null, true);
    });
  } else {
    mac(filesNames, err => {
      if (err) {
        cb(true, null);
        return;
      }
      cb(null, true);
    });
  }
}