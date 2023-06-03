window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})


const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  CopyIlyaSet: () => ipcRenderer.send('ilya-set'),
  CopyAnaSet: () => ipcRenderer.send('ana-set'),
  UpdateIlyaSet: (callback) => ipcRenderer.on('update-ilya', callback),
  UpdateAnaSet: (callback) => ipcRenderer.on('update-ana', callback)
})


