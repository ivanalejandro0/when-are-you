# Electron bug reproduction example

This is a minimal reproduction example of an Electron bug, see
https://github.com/electron/electron/issues/23730

The `window.show()` takes around 2 seconds to actually show the window.

This is using Electron 9.0.0.

Using Electron 5.0.13 the problem doesn't happen.

Reproduced on
OS: Ubuntu 18.04.4 LTS (Kubuntu)
Desktop: KDE

## How to use this example

```sh
git clone https://github.com/ivanalejandro0/electron-slow-show.git
cd electron-show-slow
yarn
yarn start
```

Use the tray icon to hide/show the window, which takes around 2 seconds to show.

Trying it out with Electron v5.0.13

```sh
sed -i -e 's/9.0.0/5.0.0/' package.json  # replaces electron version on `package.json`
yarn
yarn start
```

Use the tray icon to hide/show the window, which shows immediately.
