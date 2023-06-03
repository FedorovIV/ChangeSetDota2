// main.js
sem = true;

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs');

function fileHandler(name, mainWindow) {

  fd = fs.openSync('DeleteAndCopy.bat', 'w');
  if (name == 'ilya'){
    fs.writeFileSync('DeleteAndCopy.bat', "rd /s /q C:\\Users\\ilyaf\\Desktop\\Steam\\Ana /Q\n\
    cd C:\\Users\\ilyaf\\Desktop\\Steam\n\
    mkdir Ana\n\
    cd C:\\Users\\ilyaf\\Desktop\\Userdata\n\
    xcopy Ilya C:\\Users\\ilyaf\\Desktop\\Steam\\Ana /e");
  } else if (name == 'ana') {
    fs.writeFileSync('DeleteAndCopy.bat', "rd /s /q C:\\Users\\ilyaf\\Desktop\\Steam\\Ana /Q\n\
    cd C:\\Users\\ilyaf\\Desktop\\Steam\n\
    mkdir Ana\n\
    cd C:\\Users\\ilyaf\\Desktop\\Userdata\n\
    xcopy Ana C:\\Users\\ilyaf\\Desktop\\Steam\\Ana /e");
  }

  fs.readFileSync('DeleteAndCopy.bat');

  fs.closeSync(fd);

  spawn = require('child_process').spawn;
  const bash_run = spawn('DeleteAndCopy.bat');

  bash_run.on('close', () => {
    if (name == 'ilya'){
      mainWindow.webContents.send('update-ilya')
      sem = true;
    } else if (name == 'ana'){
      mainWindow.webContents.send('update-ana')
      sem = true;
    }
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('ilya-set', (event) => {
    console.log("ilya!")
    if (sem) {
      sem = false;
      fileHandler('ilya', mainWindow);
    }
  })

  ipcMain.on('ana-set', (event) => {
    console.log("ana!")
    if (sem) {
      sem = false;
      fileHandler('ana', mainWindow);
    }
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.