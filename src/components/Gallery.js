import React from 'react';

const sudo = window.require('sudo-prompt');
const os = window.require("os");

const fonts = [
  {
    id: 1,
    name: "Abhaya Libre",
    version: "1.0.1",
    publisher: "mooniak",
    url: "url goes here"
  },
  {
    id: 2,
    name: "Malithi Web",
    version: "1.0.2",
    publisher: "Pushpananda Ekanayake",
    url: "url goes here"
  }
];

function installFont(url) {
  // Detect O/S
  console.log(os.type(), os.platform());

  // Directory/File paths
  const fontFilePath = "/Users/jarvis/Dev/apps/fontcase-apps/fontcase-explorer/_tmp/Athena.ttf";
  const localFontsDirPath = "~/Library/Fonts/";

  // TODO:
  // Here, based on the O/S do run the terminal commands in `sudo.exec(______)`

  const options = {
    name: 'fontcase'
  };
  sudo.exec(`cp ${fontFilePath} ${localFontsDirPath}`, options,
    function(error, stdout, stderr) {
      if (error) throw error;
      console.log('stdout: ' + stdout);
    }
  );
}

const FontItem = ({ id, name, version, publisher, url}) => (
  <li key={id}>
    <div>
        <p>{name} | v{version}</p>
        <p>{publisher}</p>
      
        <button onClick={() => installFont(url)}>Install</button>
    </div>
  </li>
);

const Gallery = () => (
  <div>
    <ul>
      {fonts.map(FontItem)}
    </ul>
  </div>
);

export default Gallery;
