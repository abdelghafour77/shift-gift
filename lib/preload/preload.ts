import { contextBridge, ipcRenderer } from 'electron'
import { conveyor } from '@/lib/conveyor/api'

// Use `contextBridge` APIs to expose APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('conveyor', conveyor)
    contextBridge.exposeInMainWorld('electronAPI', {
      getMachineSerial: () => ipcRenderer.invoke('getMachineSerial'),
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.conveyor = conveyor
  window.electronAPI = {
    getMachineSerial: () => ipcRenderer.invoke('getMachineSerial'),
  }
}
