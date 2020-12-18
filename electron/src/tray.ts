import { app, Menu, Tray, nativeImage } from "electron";

import * as process from 'process';
import * as path from "path";

function createNativeImage(): Electron.NativeImage {
  const imagePath = path.join(__dirname, "../clock.png");
  const image = nativeImage.createFromPath(imagePath);
  image.setTemplateImage(true);
  return image;
}

export function showWindowUnderTray(browserWindow: Electron.BrowserWindow, tray: Electron.Tray): void {
  // https://github.com/kevinsawicki/tray-example/blob/master/main.js
  const windowBounds = browserWindow.getBounds();

  // NOTE: not available on Linux, returns { x: 0, y: 0, width: 0, height: 0 }
  const trayBounds = tray.getBounds();

  // Center window horizontally below the tray icon
  const positionX = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2));

  // Position window 4 pixels vertically below the tray icon
  const positionY = Math.round(trayBounds.y + trayBounds.height + 4);

  browserWindow.setPosition(positionX, positionY, false);
  browserWindow.show();
  browserWindow.focus();
}


export function createTray(browserWindow: Electron.BrowserWindow): Electron.Tray {
  // see: https://github.com/quantumkv/nighthawk/blob/master/src/main/tray.ts#L16
  // Linux:
  // const icon = path.join(__dirname, "../icon.png");
  // OSX:
  const icon = createNativeImage();
  const tray = new Tray(icon);

  const showWindow = () => {
    showWindowUnderTray(browserWindow, tray);
  }

  const onQuit = (): void => { app.quit(); };
  const handleShowWindow = (): void => { showWindow(); };
  const handleHideWindow = (): void => { browserWindow.hide(); };

  const handleTrayClick = (_event: any): void => {
    if (browserWindow && browserWindow.isVisible()) {
      return browserWindow.hide();
    }

    showWindow();
  }

  tray.setIgnoreDoubleClickEvents(true);

  const trayMenu: Menu = Menu.buildFromTemplate([
    {label: "Show", type: "normal", click: handleShowWindow},
    {label: "Hide", type: "normal", click: handleHideWindow},
    {type: "separator"},
    {label: "Quit", type: "normal", click: onQuit},
  ]);

  // We want the context menu to be shown when the tray icon is right-clicked.
  // Left-click is reserved to show/hide the app.


  if (process.platform === 'linux') {
    // On Linux, the context menu is shown when the tray icon is right-clicked,
    // so we can use the default context menu.
    tray.setContextMenu(trayMenu);
  } else if (process.platform === 'darwin') {
    // On OSX, the context menu is shown when the tray icon is left-clicked,
    // so we need to explicitly handle the 'right-click' event
    tray.on('right-click', function() {
      tray.popUpContextMenu(trayMenu)
    });
  }
  // TODO: Windows?

  tray.on("click", handleTrayClick);

  return tray;
}
