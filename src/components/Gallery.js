import React from 'react';
const sudo = window.require('sudo-prompt');
const os = window.require("os");

var fs = window.require('fs');
const request = window.require('request');

// get the userData path according to os
const remote = window.require('electron').remote;
const app = remote.app;





const fonts = [
  {
    id: 1,
    name: "ManameInformal-Regular",
    version: "1.0.1",
    publisher: "mooniak",
    url: "https://cdn.rawgit.com/mooniak/maname-fonts/gh-pages/fonts/otf/ManameInformal-Regular.otf"
  },
  {
    id: 2,
    name: "GemunuLibre-Bold.otf",
    version: "1.0.2",
    publisher: "Pushpananda Ekanayake",
    url: "http://cdn.rawgit.com/mooniak/gemunu-libre-font/gh-pages/tests/fonts/GemunuLibre-Bold.otf"
  }
];


// get the user folder of application

const appRoot = app.getAppPath();
console.log("app root",appRoot); 
const appUserFolder = app.getPath('userData');
console.log("user app file path => ", appUserFolder)



async function installFont(url) {
  // Detect O/S
  console.log(os.type(), os.platform());

  //replac this with url
  const fontUrl = url;
 
  //get filename
  const fileName = fontUrl.substr(fontUrl.lastIndexOf('/') + 1); 



  //based os install font
  if(os.type() === "Windows_NT"){

  
  let pathToBeDownload = appUserFolder+'\\'+fileName; // TODO add folde name font to save downloaded fonts
  // download font file to user app directory
  await new Promise(resolve =>
    request(fontUrl)
      .pipe(fs.createWriteStream(pathToBeDownload))
      .on('finish', resolve));  


   
    //script for install font in windows
    let resolveAppRoot = appRoot;
    let addFont = appRoot+'\\src\\lib\\addFont.bat';
    //resolve for build
    console.log(444,resolveAppRoot.substr((resolveAppRoot.lastIndexOf('\\') + 1)));
    if(resolveAppRoot.substr((resolveAppRoot.lastIndexOf('\\') + 1)) === "app.asar"){
      resolveAppRoot =   RemoveLastDirectoryPartOf(resolveAppRoot);
      resolveAppRoot =   RemoveLastDirectoryPartOf(resolveAppRoot.slice(0, -1));
      addFont = resolveAppRoot+'\\src\\lib\\addFont.bat';
      console.log(222,addFont);
    }

    console.log(111,addFont);
    
   
    const fileNameOrfolder  = pathToBeDownload;
    

    function windowsFontInstaller(){
      console.log("windows font installer started");  
        var spawn = window.require('child_process').spawn,
        ls    = spawn('cmd.exe', ['/c',addFont,fileNameOrfolder]); //run script font add bat script

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

    // download font file to user app directory
  await new Promise(resolve =>
     request(fontUrl)
        .pipe(fs.createWriteStream(pathToBeDownload))
        .on('finish', resolve));    

  // for unix  
  let pathToBeDownload = appUserFolder+'/'+fileName;
  // Directory/File paths
  const fontFilePath = pathToBeDownload;
  const localFontsDirPath = "~/Library/Fonts/";
    
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

//url remove last part
function RemoveLastDirectoryPartOf(the_url)
{
    var the_arr = the_url.split('\\');
    the_arr.pop();
    return( the_arr.join('\\') );
}

export default Gallery;
