// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');  // This works now because we're in the preload process

contextBridge.exposeInMainWorld('electron', {
    calculator: require(path.join(__dirname, './calculator.js')),  // Use path module here
    path: path  // Expose the path module if needed in the renderer process
});
