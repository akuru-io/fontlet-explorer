import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch } from '@blueprintjs/core';

const sudo = window.require('sudo-prompt');
const os = window.require('os');
const fs = window.require('fs');
const request = window.require('request');

const remote = window.require('electron').remote;
const app = remote.app;

// Styles
const Wrapper = styled.div`
  height: 100vh;
  padding: 15px;
`;

const Content = styled.div`
  border: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 100px;
  background-color: #f2f2f2;
  padding-left: 15px;
  padding-right: 15px;
  margin-top: 15px;
`;

const VersionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
`;

const FontName = styled.p`
  font-size: 17px;
  font-family: sans-serif;

  @media (max-width: 1000px) {
    font-size: 14px;
  }
`;

const Text = styled.p`
  font-size: 11px;
  font-family: sans-serif;

  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

const Version = styled.p`
  font-size: 11px;
  font-family: sans-serif;

  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

const Font = styled.p`
  font-size: 26px;
  font-family: sans-serif;
`;

const FontTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Fonts Obj.
const fonts = [
  {
    id: 1,
    name: 'ManameInformal-Regular',
    version: '1.0.1',
    publisher: 'mooniak',
    url: 'https://cdn.rawgit.com/mooniak/maname-fonts/gh-pages/fonts/otf/ManameInformal-Regular.otf'
  },
  {
    id: 2,
    name: 'GemunuLibre-Bold.otf',
    version: '1.0.2',
    publisher: 'Pushpananda Ekanayake',
    url: 'http://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf'
  }
];

// get the user folder of application
const appRoot = app.getAppPath();
console.log('app root', appRoot);
const appUserFolder = app.getPath('userData');
console.log('user app file path => ', appUserFolder);

// async function installFont(url) {
//   // Detect O/S
//   console.log(os.type(), os.platform());

//   // replac this with url
//   const fontUrl = url;

//   // get filename
//   const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);

//   // based os install font
//   if (os.type() === 'Windows_NT') {
//     const pathToBeDownload = `${appUserFolder}\\${fileName}`; // TODO add folde name font to save downloaded fonts
//     // download font file to user app directory
//     await new Promise(resolve =>
//       request(fontUrl)
//         .pipe(fs.createWriteStream(pathToBeDownload))
//         .on('finish', resolve)
//     );

//     // script for install font in windows
//     let resolveAppRoot = appRoot;
//     let addFont = `${appRoot}\\src\\lib\\addFont.bat`;
//     // resolve for build
//     console.log(444, resolveAppRoot.substr(resolveAppRoot.lastIndexOf('\\') + 1));
//     if (resolveAppRoot.substr(resolveAppRoot.lastIndexOf('\\') + 1) === 'app.asar') {
//       resolveAppRoot = RemoveLastDirectoryPartOf(resolveAppRoot);
//       resolveAppRoot = RemoveLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
//       addFont = `${resolveAppRoot}\\src\\lib\\addFont.bat`;
//       console.log(222, addFont);
//     }

//     console.log(111, addFont);

//     const fileNameOrfolder = pathToBeDownload;

//     function windowsFontInstaller() {
//       console.log('windows font installer started');
//       const spawn = window.require('child_process').spawn;

//       const ls = spawn('cmd.exe', ['/c', addFont, fileNameOrfolder]); // run script font add bat script

//       ls.stdout.on('data', data => {
//         console.log(`stdout: ${data}`);
//       });

//       ls.stderr.on('data', data => {
//         console.log(`stderr: ${data}`);
//       });

//       ls.on('exit', code => {
//         console.log(`child process exited with code ${code}`);
//       });
//     }

//     windowsFontInstaller();
//   } else if (os.type() === 'Linux' || os.type() === 'linux') {
//     // IF OS type is linux
//     // Directory/File paths
//     const pathToBeDownload = `${appUserFolder}/${fileName}`;
//     const fontFilePath = pathToBeDownload;
//     const localFontsDirPath = '~/.fonts';

//     // download font file to user app directory
//     await new Promise(resolve =>
//       request(fontUrl)
//         .pipe(fs.createWriteStream(pathToBeDownload))
//         .on('finish', resolve)
//     );

//     const options = {
//       name: 'fontcase'
//     };
//     sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout, stderr) => {
//       if (error) throw error;

//       console.log(`stdout-copy: ${stdout}`);
//       sudo.exec(`fc-cache -f -v`, options, (error, stdout, stderr) => {
//         if (error) throw error;

//         console.log(`stdout-cache: ${stdout}`);
//         const Install = new Notification('Title', {
//           body: 'Font got Installed'
//         });
//       });
//     });
//   } else {
//     // todo lac os fix errors

//     console.log(typeof fontUrl, fontUrl);

//     const pathToBeDownload = `${appUserFolder}/${fileName}`;
//     const fontFilePath = pathToBeDownload.replace(' ', '\\ ');
//     const localFontsDirPath = '~/Library/Fonts/';

//     console.log(fontFilePath);

//     // download font file to user app directory
//     await new Promise(resolve =>
//       request(fontUrl)
//         .pipe(fs.createWriteStream(pathToBeDownload))
//         .on('finish', resolve)
//     );

//     const options = {
//       name: 'fontcase'
//     };
//     sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout, stderr) => {
//       if (error) throw error;

//       console.log(`stdout: ${stdout}`);
//       const Install = new Notification('Title', {
//         body: 'Font got Installed'
//       });
//     });
//   }
// }

const FontItem = ({ id, name, version, publisher, url }) => (
  <li key={id}>
    <div>
      <p>
        {name} | v{version}
      </p>
      <p>{publisher}</p>

      <button onClick={() => this.installFont(url)}>Install</button>
    </div>
  </li>
);

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonState: true,
      loading: false
    };

    this.handlePublicChange = this.handlePublicChange.bind(this);
  }

  // installFont = url => {
  //   // Detect O/S
  //   console.log(os.type(), os.platform());

  //   // Directory/File paths
  //   const fontFilePath = '/Users/jarvis/Dev/apps/fontcase-apps/fontcase-explorer/_tmp/Athena.ttf';
  //   const localFontsDirPath = '~/Library/Fonts/';

  //   // TODO:
  //   // Here, based on the O/S do run the terminal commands in `sudo.exec(______)`

  //   const options = {
  //     name: 'fontcase'
  //   };
  //   sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout, stderr) => {
  //     if (error) throw error;
  //     console.log(`stdout: ${stdout}`);
  //   });
  // };

  handlePublicChange = url => {
    console.log('kkkk', url);
    const { buttonState } = this.state;
    this.setState({
      buttonState: !buttonState
    });
    if (buttonState === true) {
      this.installFont(url);
    } else {
      const Uninstall = new Notification('Title', {
        body: 'Font got Uninstalled'
      });
    }
  };

  FontItem = ({ id, name, version, publisher, url }) => {
    const { buttonState } = this.state;
    return (
      <Content key={id}>
        <VersionDetails>
          <FontName>{name}</FontName>
          <Version>v{version}</Version>
        </VersionDetails>

        <FontTextWrapper>
          <Font>{publisher}</Font>
        </FontTextWrapper>

        <ToggleButtonWrapper>
          <Switch
            checked={buttonState}
            large
            onChange={event => {
              this.handlePublicChange(url);
            }}
          />
          <Text>2 fonts installed</Text>
        </ToggleButtonWrapper>
      </Content>
    );
  };

  async installFont(url) {
    // Detect O/S
    console.log(os.type(), os.platform());

    // replac this with url
    const fontUrl = url;

    // get filename
    const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1);

    // based os install font
    if (os.type() === 'Windows_NT') {
      const pathToBeDownload = `${appUserFolder}\\${fileName}`; // TODO add folde name font to save downloaded fonts
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
        resolveAppRoot = RemoveLastDirectoryPartOf(resolveAppRoot);
        resolveAppRoot = RemoveLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
        addFont = `${resolveAppRoot}\\src\\lib\\addFont.bat`;
        console.log(222, addFont);
      }

      console.log(111, addFont);

      const fileNameOrfolder = pathToBeDownload;

      function windowsFontInstaller() {
        console.log('windows font installer started');
        const spawn = window.require('child_process').spawn;

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
      }

      windowsFontInstaller();
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
      sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout, stderr) => {
        if (error) throw error;
        this.setState({ loading: true });
        console.log(`stdout-copy: ${stdout}`);
        sudo.exec(`fc-cache -f -v`, options, (error, stdout, stderr) => {
          if (error) throw error;
          this.setState({ loading: false });
          console.log(`stdout-cache: ${stdout}`);
          const Install = new Notification('Title', {
            body: 'Font got Installed'
          });
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
      sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options, (error, stdout, stderr) => {
        if (error) throw error;

        console.log(`stdout: ${stdout}`);
        const Install = new Notification('Title', {
          body: 'Font got Installed'
        });
      });
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <Wrapper>
        {loading ? (
          <div className="bp3-progress-bar bp3-intent-primary">
            <div className="bp3-progress-meter" />
          </div>
        ) : (
          <div />
        )}

        {fonts.map(this.FontItem)}
      </Wrapper>
    );
  }
}

// url remove last part
function RemoveLastDirectoryPartOf(the_url) {
  const the_arr = the_url.split('\\');
  the_arr.pop();
  return the_arr.join('\\');
}

export default Gallery;
