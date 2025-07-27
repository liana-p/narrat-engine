console.log("electron-main.js");
// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  shell,
  dialog,
  screen: electronScreen,
} = require("electron");
const path = require("path");
const fs = require("fs");

if (process.platform === "darwin") {
  app.commandLine.appendSwitch("no-sandbox");
}
// const log = require("electron-log/main");
// console.log(log);
// log.initialize();
// log.info("electron logs initialised");

let useSteam = false;
let isDebug = false;
let electronEnvFile = null;
let electronEnv = null;
let hasEnvVariables = false;
let mainWindow;
// Env variables used when running electron directly OUTSIDE of builds, set in scripts
if (process.env.VITE_STEAM) {
  useSteam = true;
  hasEnvVariables = true;
}
if (process.env.VITE_DEBUG) {
  isDebug = true;
  hasEnvVariables = true;
}
if (!hasEnvVariables) {
  const electronEnvPath = path.join(__dirname, "electron-env.json");
  // Env variables set statically during forge build by writing to electron-env.json:
  if (fs.existsSync(electronEnvPath)) {
    console.log("Using electron-env.json");
    electronEnvFile = fs.readFileSync(electronEnvPath, "utf8");
    electronEnv = JSON.parse(electronEnvFile);
    if (electronEnv && typeof electronEnv === "object") {
      console.log(`Steam: ${electronEnv.steam} - Debug: ${electronEnv.debug}`);
      useSteam = !!electronEnv.steam;
      isDebug = !!electronEnv.debug;
    }
  }
}

// This handler must be set ASAP to prevent ghost processes.
process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
  app.quit();
  process.exit(1);
});

let steamworks;
if (useSteam) {
  steamworks = require("steamworks.js");
  console.log("Using Steamworks.js:, ", steamworks);
  console.log("steamworks.init():");
  const client = steamworks.init();

  console.log("Steamworks.js client:", client);
  console.log(client.localplayer.getName());
  console.log("in-process-gpu:");
  app.commandLine.appendSwitch("in-process-gpu");
  console.log("disable-direct-composition:");
  app.commandLine.appendSwitch("disable-direct-composition");
  console.log("allowRenderProcessReuse:");
  app.allowRendererProcessReuse = false;
}

function buildDebugInfo() {
  const userData = app.getPath("userData");

  const debugInfo = `
    Steam enabled: ${useSteam}
    Debug enabled: ${isDebug}
    User Data path: ${userData}
  `;
  return debugInfo;
}

const menuTemplate = [
  {
    role: "help",
    submenu: [
      {
        label: "Dev info",
        click: () => {
          const debugInfo = buildDebugInfo();
          mainWindow.webContents.executeJavaScript(`alert(\`${debugInfo}\`)`);
        },
      },
      {
        label: "Open Local Storage Folder",
        click: () => {
          const userData = app.getPath("userData");
          shell.showItemInFolder(`${userData}/Local Storage/leveldb`);
        },
      },
      {
        label: "Open Dev Tools",
        click: () => {
          mainWindow.webContents.openDevTools();
        },
      },
    ],
  },
];
console.log("Menu.buildFromTemplate:");

if (isDebug) {
  const menu = Menu.buildFromTemplate(menuTemplate);
  console.log("isDebug: setApplicationMenu:");
  Menu.setApplicationMenu(menu);
}

function fullyQuit() {
  console.log("fullyQuit()");
  if (mainWindow) {
    console.log("mainWindow exists, removing listeners and destroying it");
    mainWindow.removeAllListeners("close");
    mainWindow.removeAllListeners("closed");
    mainWindow.destroy();
  }
  console.log("setting main window to null");
  mainWindow = null;
  console.log("About to actually quit the app");
  app.quit();
  process.exit(0);
}

function createWindow() {
  // Create the browser window.
  console.log("createWindow():");
  const webPreferences = {
    preload: path.join(__dirname, "electron-preload.js"),
    devTools: isDebug,
  };
  if (useSteam) {
    console.log("webpref nodeIntegration and contextIsolation:");
    webPreferences.nodeIntegration = true;
    webPreferences.contextIsolation = false;
  }

  console.log("about to create window:");
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    // icon: "icon.png",
    // resizable: true,
    // fullscreenable: true, THIS BREAKS STEAM
    fullscreen: true,
    autoHideMenuBar: !isDebug,
    webPreferences,

    icon: path.join(__dirname, "icon.png"),
  });
  console.log("created window:");
  if (isDebug) {
    mainWindow.webContents.openDevTools({ mode: "detach" });
  }
  // log.info("creating window");

  if (!isDebug) {
    mainWindow.setMenu(null);
  }

  mainWindow.on("closed", function () {
    console.log("MAINWIN:Closed...");
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    fullyQuit();
  });
  setTimeout(() => {
    console.log(`load dist/index.html`);
    mainWindow.loadFile("dist/index.html");
    mainWindow.show();
    setTimeout(() => {
      console.log(`handle SteamTenFoot`);
      if (process.env.SteamTenfoot) {
        console.log(`setFullscreen true`);
        mainWindow.setFullScreen(true);
      } else {
        console.log(`or maximise`);
        mainWindow.maximize();
      }

      console.log("executeJS: log useSteam and isDebug:");
      console.log(`useSteam: ${useSteam}`);
      console.log(`isDebug: ${isDebug}`);
      mainWindow.webContents.executeJavaScript(`console.log(\`
      Steam enabled: ${useSteam}
      Debug enabled: ${isDebug}
      \`)`);
      console.log(`set aspect ratio and comntent size`);
      // and load the index.html of the app.
      mainWindow.setAspectRatio(1920 / 1080);
      mainWindow.setContentSize(1920, 1080);
    }, 100);
  }, 500);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

async function handleSingleWindowLock() {
  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    await dialog.showMessageBox(undefined, {
      title: "Game",
      message: "Failed to launch",
      detail:
        "The Game is already running. Please do not launch the game multiple times.",
      type: "error",
      buttons: ["OK"],
    });
    app.quit();
    return;
  }
  app.on(
    "second-instance",
    (event, commandLine, workingDirectory, additionalData) => {
      console.error(
        "A second instance is launched",
        event,
        commandLine,
        workingDirectory,
        additionalData,
      );
      // The player tried to run a second instance. We should focus the current window.
      if (!mainWindow) {
        return;
      }
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    },
  );
}
console.log(`create app.whenReady callback`);
app.whenReady().then(() => {
  console.log(`app.whenReady`);
  handleSingleWindowLock();

  console.log(`about to call createWindow`);
  createWindow();
  console.log(`after createWindow`);
});

app.on("activate", function () {
  console.log(`app.on activate callback`);
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    console.log(`on activate callback creating window again...`);
    createWindow();
  }
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
console.log(`creating window closed callback`);
app.on("window-all-closed", function () {
  console.log(`app.on window-all-closed callback`);
  fullyQuit();
});

// REquired for steam overlay
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
console.log(`before electron enable`);
if (useSteam) {
  console.log(`electron enable steam overlay`);
  steamworks.electronEnableSteamOverlay();
}
