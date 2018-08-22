import React from 'react';

const sudo = window.require('sudo-prompt');
const os = window.require("os");
const addFont = "C:\\Users\\Sachintha\\Desktop\\new\\fontcase-explorer\\src\\lib\\addFont.bat";

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

  if(os.type() == "Windows_NT"){
    console.log("codes goes");


    function test(){
              console.log("its working")
              var spawn = window.require('child_process').spawn,
        ls    = spawn('cmd.exe', ['/c', addFont]);

        ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
        });

        ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
        });

        ls.on('exit', function (code) {
        console.log('child process exited with code ' + code);
        });

    }

    test();
  }

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
