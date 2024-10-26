import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // optional if you want a preload script
      contextIsolation: true,
    },
  });

  const url = isDev
    ? 'http://localhost:3000/' // Vite dev server
    : `file://${path.join(__dirname, '../dist/index.html')}`; // Production build

  win.loadURL(url);

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
