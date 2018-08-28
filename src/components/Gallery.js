import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Card, Elevation } from '@blueprintjs/core';
import { Assets } from '../assets/assets';

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

const Content = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const CardContent = styled.div`
  margin-top: 15px;
`;

const VersionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-right: 15px;
`;

const VersionContent = styled.div`
  display: flex;
  flex: 1;
`;

const FontName = styled.p`
  font-size: 17px;
  font-family: sans-serif;

  color: #867f7f;

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
  color: #5a5555;

  @media (max-width: 1000px) {
    font-size: 10px;
  }
`;

const Font = styled.p`
  font-size: 26px;
  color: #5a5555;
  font-family: sans-serif;
`;

const FontTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex: 1; */
`;
// const CloseButton = styled.Image`
//   height: 20px;
//   width: 20px;
//   margin-right: 20px;
// `;

const SettingsContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const FontImage = styled.img`
  width: 100%;
  height: 100%;
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
    url:
      'https://cdn.rawgit.com/mooniak/maname-fonts/gh-pages/fonts/otf/ManameInformal-Regular.otf',
    installed: false,
    fontImage: Assets.image1
  },
  {
    id: 2,
    name: 'GemunuLibre-Bold.otf',
    version: '1.0.2',
    publisher: 'Pushpananda Ekanayake',
    url:
      'http://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf',
    installed: false,
    fontImage: Assets.image2
  }
];

// get the user folder of application
const appRoot = app.getAppPath();
console.log('app root', appRoot);
const appUserFolder = app.getPath('userData');
console.log('user app file path => ', appUserFolder);

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: '',
      fontData: [],
      loadingFontId: ''
    };

    this.handlePublicChange = this.handlePublicChange.bind(this);
  }

  componentDidMount() {
    this.setState({ fontData: fonts });
  }

  handlePublicChange = (url, installed, id) => {
    const { fontData } = this.state;
    if (!installed) {
      this.installFont(url, id);
    } else {
      const Uninstall = new Notification('Font is successfully uninstalled !');
    }

    const newFontData = fontData.map(font => {
      if (font.id === id) {
        return {
          ...font,
          installed: !font.installed
        };
      }

      return font;
    });

    this.setState({ fontData: newFontData });
  };

  FontItem = ({ id, name, version, publisher, url, installed, fontImage }) => {
    const { loading, loadingFontId } = this.state;
    return (
      <CardContent key={id}>
        {loading &&
          loadingFontId === id && (
            <div className="bp3-progress-bar bp3-intent-primary">
              <div className="bp3-progress-meter" />
            </div>
          )}
        <Content elevation={Elevation.TWO}>
          <FontImage src={fontImage} />

          <SettingsContent>
            <VersionContent>
              <VersionDetails>
                <FontName>{name}</FontName>
                <Version>v{version}</Version>
              </VersionDetails>
            </VersionContent>

            <ToggleButtonWrapper>
              <Switch
                className="switch-style"
                checked={installed}
                large
                onChange={event => {
                  this.handlePublicChange(url, installed, id);
                }}
              />
              <Text>2 fonts installed</Text>
            </ToggleButtonWrapper>
          </SettingsContent>
        </Content>
      </CardContent>
    );
  };

  async installFont(url, id) {
    // Detect O/S
    console.log(os.type(), os.platform());

    // replac this with url
    const fontUrl = url;
    this.setState({ loading: true, loadingFontId: id });
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
        // this.setState({ loading: true });
        console.log(`stdout-copy: ${stdout}`);
        sudo.exec(`fc-cache -f -v`, options, (error, stdout, stderr) => {
          if (error) throw error;
          this.setState({ loading: false });
          console.log(`stdout-cache: ${stdout}`);
          const Install = new Notification('Font is successfully installed !');
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
        this.setState({ loading: false });
        const Install = new Notification('Font is successfully installed !');
      });
    }
  }

  render() {
    const { loading, fontData } = this.state;

    return <Wrapper>{fontData.map(this.FontItem)}</Wrapper>;
  }
}

// url remove last part
function RemoveLastDirectoryPartOf(the_url) {
  const the_arr = the_url.split('\\');
  the_arr.pop();
  return the_arr.join('\\');
}

export default Gallery;
