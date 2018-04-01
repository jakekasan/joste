const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// when app is ready
app.on('ready',function(){

  // create the main Window object

  mainWindow = new BrowserWindow({
    width:500,
    heigh:500
  });

  // load the html file for the main window

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "html/mainWindow.html"),
    protocol: "file:",
    slashes: true
  }));

  // Quit if main window is closed

  mainWindow.on('closed',function(){
    app.quit();
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
});

// Add data to the request

function createAddWindow(){
  
  // create a window to input Data
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add Data"
  });

  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, "html/addData.html"),
    protocol: "file:",
    slashes: true
  }));

  // delete the addWindow if its not needed anymore

  addWindow.on('close',function(){
    addWindow = null;
  });
};

ipcMain.on('item:add',function(event,item){
  console.log(item);
  mainWindow.webContents.send("item:add",item);
  addWindow.close();
});

const mainMenuTemplate = [
  {
    label:"File",
    submenu:[
      {
        label:"Add Data",
        click(){
          createAddWindow();
        }
      },
      {
        label:"Item 2"
      },
      {
        label:"Quit",
        accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q",
        click(){
          app.quit();
        }
      }
    ],
  }
]

// if we're on OSX, shift the toolbar

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

// get developer tools

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label:"Dev Tools",
    submenu:[
      {
        label: "Toggle Dev Tools",
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        },
        accelerator: process.platform == 'darwin' ? "Command+I" : "Ctrl+I",
      },
      {
        role: "reload"
      }
    ]
  })
}
