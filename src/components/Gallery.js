import React from 'react';


//const app = window.require('electron');

//const app = windows.electron.app;

const sudo = window.require('sudo-prompt');
const os = window.require("os");
const addFont = "C:\\Users\\Sachintha\\Desktop\\new\\fontcase-explorer\\src\\lib\\addFont.bat";
var http = window.require('http');
var fs = window.require('fs');
const Path = window.require('path') ; 
const Axios = window.require('axios');
const request = window.require('request');





// used to get the userData path according to os
const remote = window.require('electron').remote;
const app = remote.app;



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

//Todo write function to download font to local



async function installFont(url) {
  // Detect O/S
  console.log(os.type(), os.platform());

  const urlParam = "http://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf"

  const userFileStorePath = app.getPath('userData');
  const fileName = urlParam.substr(urlParam.lastIndexOf('/') + 1);
  const pathToBeDownload = userFileStorePath+'\\fonts\\' +fileName;

  //check if File Exist

  
  

  //await download(urlParam);

  // async function download(urlParam){
  //   const fileName = urlParam.substr(urlParam.lastIndexOf('/') + 1);

  //   var file = fs.createWriteStream(pathToBeDownload);
  //   var request = await http.get(urlParam, function(response) {
  //     response.pipe(file);
  //   });

  // }

  // async function downloadImage () {

  //   const url = 'https://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf'
  //   const path =await  Path.resolve(pathToBeDownload )
  
  //   // axios image download with response type "stream"
  //   const response = await Axios({
  //     method: 'GET',
  //     url: url,
  //     responseType: 'stream'
  //   })
  
  //   // pipe the result stream into a file on disc
  //   response.data.pipe(Fs.createWriteStream(pathToBeDownload))
  
  //   // return a promise and resolve when download finishes
  //   return new Promise((resolve, reject) => {
  //     response.data.on('end', () => {
  //       resolve()
  //     })
  
  //     response.data.on('error', () => {
  //       reject()
  //     })
  //   })
  
  // }

  // await downloadImage();
  

  await new Promise(resolve =>
    request("http://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf")
      .pipe(fs.createWriteStream(pathToBeDownload))
      .on('finish', resolve));


  

  

  // Directory/File paths
  const fontFilePath = pathToBeDownload;
  const localFontsDirPath = "~/Library/Fonts/";



  // Here, based on the O/S do run the terminal commands in `sudo.exec(______)`

  if(os.type() === "Windows_NT"){
    console.log("windows font installer started");
    const fileNameOrfolder  = "C:\\Users\\Sachintha\\AppData\\Roaming\\fontcase-explorer\\fonts\\BodoniFLF-Bold.ttf"

    function windowsFontInstaller(){
        console.log("its working")
        var spawn = window.require('child_process').spawn,
        ls    = spawn('cmd.exe', ['/c', addFont,fileNameOrfolder]);

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

    windowsFontInstaller();

    
  }else{

 // for unix   
    
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
