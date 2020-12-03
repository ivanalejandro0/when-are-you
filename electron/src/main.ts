import { app, BrowserWindow, globalShortcut } from "electron";
import * as path from "path";

import { createTray, showWindowUnderTray } from "./tray";

let mainWindow: Electron.BrowserWindow;
let tray: Electron.Tray;

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 680,
    width: 580,
    frame: false,
    skipTaskbar: true,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  tray = createTray(mainWindow);

  // and load the index.html of the app.
  // mainWindow.loadFile(path.join(__dirname, "../index.html"));
  const localServer = 'http://localhost:8080/';
  mainWindow.loadURL(localServer);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
  const toggleWindowVisibility = (): void => {
    if (mainWindow && mainWindow.isVisible()) {
      return mainWindow.hide();
    }
    showWindowUnderTray(mainWindow, tray);
  }

  globalShortcut.register("Ctrl+Alt+w", () => toggleWindowVisibility());

  mainWindow.on('ready-to-show', () => {
    mainWindow.setVisibleOnAllWorkspaces(true);

    // comment this out to start the app hidden
    showWindowUnderTray(mainWindow, tray);

    if (app.dock) {
      // hide app icon from the dock on Mac
      app.dock.hide();
    }
  });

  mainWindow.on('blur', () => { mainWindow.hide() });

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
