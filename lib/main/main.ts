import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { createAppWindow } from './app'
import si from 'systeminformation'
import { machineId } from 'node-machine-id'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // Create app window
  createAppWindow()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createAppWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file, you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('getMachineSerial', async () => {
  try {
    console.error('getMachineSerial try')
    // 1) Tentative via systeminformation
    try {
      const sys = await si.system()
      if (sys && sys.serial && sys.serial.trim() && sys.serial.toLowerCase() !== 'none') {
        return { source: 'systeminformation', serial: sys.serial }
      }
    } catch (e) {
      // ignore and fallback
      console.warn('systeminformation failed', e)
    }

    // 2) node-machine-id as fallback (unique id, not BIOS serial)
    try {
      const id = await machineId() // true optional => hashed; default returns plain
      if (id) {
        return { source: 'machine-id', serial: id }
      }
    } catch (e) {
      console.warn('node-machine-id failed', e)
    }

    // 3) Platform-specific commands / files
    const platform = process.platform

    if (platform === 'win32') {
      // try WMIC (may be present)
      try {
        const { stdout } = await execAsync('wmic bios get serialnumber')
        const lines = stdout
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean)
        if (lines.length >= 2) {
          const sn = lines[1]
          if (sn && sn.toLowerCase() !== 'serialnumber') return { source: 'wmic', serial: sn }
        }
      } catch (e) {
        /* ignore */
      }

      // fallback powershell
      try {
        const { stdout } = await execAsync(
          'powershell -Command "Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber"'
        )
        const sn = stdout.trim()
        if (sn) return { source: 'powershell', serial: sn }
      } catch (e) {
        /* ignore */
      }
    } else if (platform === 'darwin') {
      // macOS: system_profiler or ioreg
      try {
        const { stdout } = await execAsync("system_profiler SPHardwareDataType | awk '/Serial/ {print $4}'")
        const sn = stdout.trim()
        if (sn) return { source: 'system_profiler', serial: sn }
      } catch (e) {
        /* ignore */
      }

      try {
        const { stdout } = await execAsync("ioreg -l | awk -F\\\" '/IOPlatformSerialNumber/{print $4; exit}'")
        const sn = stdout.trim()
        if (sn) return { source: 'ioreg', serial: sn }
      } catch (e) {
        /* ignore */
      }
    } else {
      // linux: try /sys then dmidecode
      try {
        const { stdout } = await execAsync('cat /sys/class/dmi/id/product_serial')
        const sn = stdout.trim()
        if (sn && sn !== 'None') return { source: '/sys/class/dmi', serial: sn }
      } catch (e) {
        /* ignore */
      }

      // dmidecode (may require root)
      try {
        const { stdout } = await execAsync('dmidecode -s system-serial-number')
        const sn = stdout.trim()
        if (sn) return { source: 'dmidecode', serial: sn }
      } catch (e) {
        /* ignore */
      }
    }

    console.warn('⚠️ No serial found, returning null')
    // nothing found
    return { source: 'none', serial: null }
  } catch (err) {
    console.error('getMachineSerial error', err)
    return { source: 'error', error: String(err) }
  }
})
