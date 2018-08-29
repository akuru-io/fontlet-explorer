import { appUserFolder, appRoot, removeLastDirectoryPartOf } from './core';

const sudo = window.require('sudo-prompt');
const os = window.require('os');
const fs = window.require('fs');
const request = window.require('request');

const windowsFontInstaller = ({ addFont, fileNameOrfolder }) => {
  console.log('windows font installer started');
  const { spawn } = window.require('child_process');

  const ls = spawn('cmd.exe', ['/c', addFont, fileNameOrfolder]); // run script font add bat script

  ls.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  ls.on('exit', code => {
    console.log(`child process exited with code ${code}`);
  });
};

export default async url => {
  // replac this with url
  const fontUrl = url;

  // get filename
  const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);

  // based os install font
  if (os.type() === 'Windows_NT') {
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
    // resolve for build
    console.log(444, resolveAppRoot.substr(resolveAppRoot.lastIndexOf('\\') + 1));
    if (resolveAppRoot.substr(resolveAppRoot.lastIndexOf('\\') + 1) === 'app.asar') {
      resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot);
      resolveAppRoot = removeLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
      addFont = `${resolveAppRoot}\\src\\lib\\addFont.bat`;
      console.log(222, addFont);
    }

    console.log(111, addFont);

    const fileNameOrfolder = pathToBeDownload;

    windowsFontInstaller({ addFont, fileNameOrfolder });
  } else if (os.type() === 'Linux' || os.type() === 'linux') {
    // IF OS type is linux
    // Directory/File paths
    const pathToBeDownload = `${appUserFolder}/${fileName}`;
    const fontFilePath = pathToBeDownload;
    const localFontsDirPath = '~/.fonts';

    // download font file to user app directory
    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on('finish', resolve)
    );

    const options = {
      name: 'fontcase'
    };
    sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout) => {
      if (error) throw error;
      console.log(`stdout-copy: ${stdout}`);
      sudo.exec(`fc-cache -f -v`, options, (fCacheError, fCacheStdout) => {
        if (fCacheError) throw fCacheError;
        console.log(`stdout-cache: ${fCacheStdout}`);
      });
    });
  } else {
    // todo lac os fix errors

    console.log(typeof fontUrl, fontUrl);

    const pathToBeDownload = `${appUserFolder}/${fileName}`;
    const fontFilePath = pathToBeDownload.replace(' ', '\\ ');
    const localFontsDirPath = '~/Library/Fonts/';

    console.log(fontFilePath);

    // download font file to user app directory
    await new Promise(resolve =>
      request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on('finish', resolve)
    );

    const options = {
      name: 'fontcase'
    };
    sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout) => {
      if (error) throw error;
      console.log(`stdout: ${stdout}`);
    });
  }
};
