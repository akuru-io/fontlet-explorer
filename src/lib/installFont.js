import { appUserFolder, appRoot, removeLastDirectoryPartOf } from './core';

const sudo = window.require('sudo-prompt');
const os = window.require('os');
const fs = window.require('fs');
const request = window.require('request');

async function win(fontList, cb) {
  // TODO: IMPLEMENTS MULTI_FONTS INSTALL MECHANISM like in Mac/Lin methods ***
  const fontUrl = fontList[0];

  // get filename
  const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);

  const pathToBeDownload = `${appUserFolder}\\${fileName}`; // TODO add folde name
  // font to save downloaded fonts
  // download font file to user app directory
  await new Promise(resolve =>
    request(fontUrl)
      .pipe(fs.createWriteStream(pathToBeDownload))
      .on('finish', resolve)
  );

  // script for install font in windows
  let resolveAppRoot = appRoot;
  let addFont = `${appRoot}\\src\\lib\\addFont.bat`;
  
  if (resolveAppRoot.substr(resolveAppRoot.lastIndexOf('\\') + 1) === 'app.asar') {
    resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot);
    resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
    addFont = `${resolveAppRoot}\\src\\lib\\addFont.bat`;
    console.log(222, addFont);
  }

  const fileNameOrfolder = pathToBeDownload;

  // Install
  const { spawn } = window.require('child_process');
  const ls = spawn('cmd.exe', ['/c', addFont, fileNameOrfolder]); // run script font add bat script

  ls.stdout.on('data', data => {
    cb(null, data);
  });

  ls.stderr.on('data', data => {
    cb(data, null);
  });

  ls.on('exit', code => {
    cb(code, null);
  });
}

async function lin(fontList, cb) {
  const fontInstallingQueue = fontList.map(async (fontUrl) => {
    const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);
    const pathToBeDownload = `${appUserFolder}/${fileName}`;

    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on('finish', resolve)
    );
    return pathToBeDownload;
  });


  Promise.all(fontInstallingQueue).then((paths) => {
    const fontsFilePath = paths.join(" ");
    const localFontsDirPath = '~/.fonts';

    const options = {
      name: 'fontcase',
      cachePassword: true
    };
    sudo.exec(`cp ${fontsFilePath} ${localFontsDirPath}`, options, (error, stdout) => {
      if (error) {
        cb(error, null);
        return;
      }

      sudo.exec(`fc-cache -f -v`, options, (fCacheError, fCacheStdout) => {
        if (fCacheError) {
          cb(fCacheError, null);
          return;
        }
        cb(null, fCacheStdout);
      });
    });
  });
}

async function mac(fontList, cb) {
  const fontInstallingQueue = fontList.map(async (fontUrl) => {
    const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);
    const pathToBeDownload = `${appUserFolder}/${fileName}`;

    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on('finish', resolve)
    );
    return pathToBeDownload;
  });

  Promise.all(fontInstallingQueue).then((paths) => {
    const fontsFilePath = paths.map(path => path.replace(' ', '\\ ')).join(" ");
    const localFontsDirPath = '~/Library/Fonts/';

    const options = {
      name: 'fontcase',
      cachePassword: true
    };
    sudo.exec(`cp ${fontsFilePath} ${localFontsDirPath}`, options, (error, stdout) => {
      if (error) {
        cb(error, null);
        return;
      }

      cb(null, {stdout})
    });
  });
}

export default async (fontList, cb) => {
  if (os.type() === 'Windows_NT') {
    win(fontList, (err) => {
      if (err) {
        cb(true, null);
        return;
      }
      cb(null, true);
    });
  } else if (os.type() === 'Linux' || os.type() === 'linux') {
    lin(fontList, (err) => {
      if (err) {
        cb(true, null);
        return;
      }
      cb(null, true);
    });
  } else {
    mac(fontList, (err) => {
      if (err) {
        cb(true, null);
        return;
      }
      cb(null, true);
    });
  }
};
