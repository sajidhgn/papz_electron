import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';
import isDev from 'electron-is-dev';
import { SerialPort } from 'serialport';
import ThermalPrinter from 'node-thermal-printer';
import http from 'http';

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow; // Declare mainWindow globally

function createWindow() {
  mainWindow = new BrowserWindow({ // Assign to the global variable
    width: 1200,
    height: 900,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  const url = isDev
    ? 'http://localhost:3000/'
    : `file://${path.join(__dirname, '../dist/index.html')}`;

  mainWindow.loadURL(url); // Load the URL into the main window

  if (isDev) {
    mainWindow.webContents.openDevTools(); // Open DevTools if in development mode
  }
}

app.on('ready', () => {
  createWindow(); // Create the window when app is ready
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('get-mac-address', async () => {
  try {
    const interfaces = os.networkInterfaces();
    const values = Object.values(interfaces).flat();

    const mac = values.find((iface) => iface && !iface.internal)?.mac;
    return mac || 'Unavailable';
  } catch (error) {
    console.error('Error fetching MAC address:', error);
    return 'Error fetching MAC address';
  }
});

// ipcMain.handle('get-serial-ports', async () => {
//   const ports = await SerialPort.list();
//   return ports;
// });

// ipcMain.handle('get-printers', async () => {
//   if (!mainWindow) {
//     throw new Error('Main window is not defined');
//   }
//   const printers = mainWindow.webContents.getPrinters(); // Access the printers from the main window
//   return printers;
// });

// ipcMain.handle('initialize-serial-port', async (event, { portName, baudRate }) => {
//   const serialPort = new SerialPort({ path: portName, baudRate });
//   return serialPort.isOpen ? 'Serial port opened successfully' : 'Failed to open serial port';
// });

// ipcMain.handle('print-test', async (event, printerName) => {
//   const printer = new ThermalPrinter({
//     type: 'epson',  // Change if necessary
//     interface: `printer:${printerName}`,
//   });

//   const isConnected = await printer.isPrinterConnected();
//   if (isConnected) {
//     printer.println(`Printing from ${printerName}`);
//     printer.cut();
//     await printer.execute();
//     return `Printed successfully to ${printerName}!`;
//   } else {
//     return `Failed to connect to printer: ${printerName}`;
//   }
// });

const checkMachineConnection = (event) => {
  const options = {
    hostname: '192.168.1.69',
    port: 8080,
    path: '/',
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('eatstek_admin:chpshpmngr').toString('base64'),
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('Response:', jsonData);
        
        // Send the data back to the renderer process
        event.reply('machine-connection-response', jsonData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        event.reply('machine-connection-response', { error: 'Error parsing response' });
      }
    });
  });

  req.on('error', (error) => {
    console.error('Error fetching device info:', error);
    event.reply('machine-connection-response', { error: 'Error fetching data' });
  });

  req.end();
};

// Listen for the IPC event from the renderer process
ipcMain.on('check-machine-connection', (event) => {
  checkMachineConnection(event);
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
