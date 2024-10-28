const { contextBridge, ipcRenderer } = require('electron');

// Get Mac Address
try {
  contextBridge.exposeInMainWorld('macElectronAPI', {
    getMacAddress: async () => await ipcRenderer.invoke('get-mac-address'),
  });
  console.log('mac address script loaded successfully!');
} catch (error) {
  console.error('Failed to load mac address script:', error);
}

// Get Printers
// try {
//   contextBridge.exposeInMainWorld('printerElectronAPI', {
//     getPrinters: async () => await ipcRenderer.invoke('get-printers'),
//     printTest: async (printerName) => await ipcRenderer.invoke('print-test', printerName),
//     getSerialPorts: async () => await ipcRenderer.invoke('get-serial-ports'),
//     initializeSerialPort: async (portName, baudRate) =>
//       await ipcRenderer.invoke('initialize-serial-port', { portName, baudRate }),
//   });
//   console.log('printer script loaded successfully!');
// } catch (error) {
//   console.error('Failed to load printer script:', error);
// }

try {
  contextBridge.exposeInMainWorld('machineElectronAPI', {
    checkMachineConnection: () => ipcRenderer.send('check-machine-connection'),
    ipcRenderer: {
      on: (event, listener) => ipcRenderer.on(event, listener),
      removeListener: (event, listener) => ipcRenderer.removeListener(event, listener),
    },
  })

  console.log('machine script loaded successfully!');
} catch (error) {
  console.error('Failed to load machine script:', error);
}



