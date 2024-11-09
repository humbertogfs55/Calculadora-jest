const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 330,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),  // Set the path to preload.js
            nodeIntegration: false,   // Disable Node.js integration in the renderer process
            contextIsolation: true,   // Enable context isolation for security
            enableRemoteModule: false,  // Disable the remote module (for security)
            sandbox: false
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    // Register the 'Ctrl+I' keyboard shortcut to open DevTools
    globalShortcut.register('CmdOrCtrl+I', () => {
        if (mainWindow) {
            mainWindow.webContents.toggleDevTools();  // Toggle DevTools on Ctrl+I press
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Unregister the shortcut when the app is quit (optional but good practice)
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
