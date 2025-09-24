"use strict";
const electron = require("electron");
const utils = require("@electron-toolkit/utils");
const path = require("path");
const url = require("url");
const zod = require("zod");
const preload = require("@electron-toolkit/preload");
const si = require("systeminformation");
const nodeMachineId = require("node-machine-id");
const child_process = require("child_process");
const util = require("util");
const appIcon = path.join(__dirname, "../../resources/build/RAM_logo.png");
function registerResourcesProtocol() {
  electron.protocol.handle("res", async (request) => {
    try {
      const url$1 = new URL(request.url);
      const fullPath = path.join(url$1.hostname, url$1.pathname.slice(1));
      const filePath = path.join(__dirname, "../../resources", fullPath);
      return electron.net.fetch(url.pathToFileURL(filePath).toString());
    } catch (error) {
      console.error("Protocol error:", error);
      return new Response("Resource not found", { status: 404 });
    }
  });
}
const windowIpcSchema = {
  "window-init": {
    args: zod.z.tuple([]),
    return: zod.z.object({
      width: zod.z.number(),
      height: zod.z.number(),
      minimizable: zod.z.boolean(),
      maximizable: zod.z.boolean(),
      platform: zod.z.string()
    })
  },
  "window-is-minimizable": {
    args: zod.z.tuple([]),
    return: zod.z.boolean()
  },
  "window-is-maximizable": {
    args: zod.z.tuple([]),
    return: zod.z.boolean()
  },
  "window-minimize": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "window-maximize": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "window-close": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "window-maximize-toggle": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  // Web content operations
  "web-undo": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-redo": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-cut": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-copy": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-paste": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-delete": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-select-all": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-reload": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-force-reload": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-toggle-devtools": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-actual-size": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-zoom-in": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-zoom-out": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-toggle-fullscreen": {
    args: zod.z.tuple([]),
    return: zod.z.void()
  },
  "web-open-url": {
    args: zod.z.tuple([zod.z.string()]),
    return: zod.z.void()
  }
};
const appIpcSchema = {
  version: {
    args: zod.z.tuple([]),
    return: zod.z.string()
  }
};
const ipcSchemas = {
  ...windowIpcSchema,
  ...appIpcSchema
};
const validateArgs = (channel, args) => {
  return ipcSchemas[channel].args.parse(args);
};
const validateReturn = (channel, data) => {
  return ipcSchemas[channel].return.parse(data);
};
const handle = (channel, handler) => {
  electron.ipcMain.handle(channel, async (_, ...args) => {
    try {
      const validatedArgs = validateArgs(channel, args);
      const result = await handler(...validatedArgs);
      return validateReturn(channel, result);
    } catch (error) {
      console.error(`IPC Error in ${channel}:`, error);
      throw error;
    }
  });
};
const registerWindowHandlers = (window) => {
  handle("window-init", () => {
    const { width, height } = window.getBounds();
    const minimizable = window.isMinimizable();
    const maximizable = window.isMaximizable();
    const platform = preload.electronAPI.process.platform;
    return { width, height, minimizable, maximizable, platform };
  });
  handle("window-is-minimizable", () => window.isMinimizable());
  handle("window-is-maximizable", () => window.isMaximizable());
  handle("window-minimize", () => window.minimize());
  handle("window-maximize", () => window.maximize());
  handle("window-close", () => window.close());
  handle("window-maximize-toggle", () => window.isMaximized() ? window.unmaximize() : window.maximize());
  const webContents = window.webContents;
  handle("web-undo", () => webContents.undo());
  handle("web-redo", () => webContents.redo());
  handle("web-cut", () => webContents.cut());
  handle("web-copy", () => webContents.copy());
  handle("web-paste", () => webContents.paste());
  handle("web-delete", () => webContents.delete());
  handle("web-select-all", () => webContents.selectAll());
  handle("web-reload", () => webContents.reload());
  handle("web-force-reload", () => webContents.reloadIgnoringCache());
  handle("web-toggle-devtools", () => webContents.toggleDevTools());
  handle("web-actual-size", () => webContents.setZoomLevel(0));
  handle("web-zoom-in", () => webContents.setZoomLevel(webContents.zoomLevel + 0.5));
  handle("web-zoom-out", () => webContents.setZoomLevel(webContents.zoomLevel - 0.5));
  handle("web-toggle-fullscreen", () => window.setFullScreen(!window.fullScreen));
  handle("web-open-url", (url2) => electron.shell.openExternal(url2));
};
const registerAppHandlers = (app) => {
  handle("version", () => app.getVersion());
};
function createAppWindow() {
  registerResourcesProtocol();
  const mainWindow = new electron.BrowserWindow({
    width: 1e3,
    height: 750,
    show: false,
    backgroundColor: "#1c1c1c",
    icon: appIcon,
    autoHideMenuBar: true,
    title: "Pointage Digital App",
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      sandbox: false
    }
  });
  registerWindowHandlers(mainWindow);
  registerAppHandlers(electron.app);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (!electron.app.isPackaged && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
const execAsync = util.promisify(child_process.exec);
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  createAppWindow();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createAppWindow();
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("getMachineSerial", async () => {
  try {
    console.error("getMachineSerial try");
    try {
      const sys = await si.system();
      if (sys && sys.serial && sys.serial.trim() && sys.serial.toLowerCase() !== "none") {
        return { source: "systeminformation", serial: sys.serial };
      }
    } catch (e) {
      console.warn("systeminformation failed", e);
    }
    try {
      const id = await nodeMachineId.machineId();
      if (id) {
        return { source: "machine-id", serial: id };
      }
    } catch (e) {
      console.warn("node-machine-id failed", e);
    }
    const platform = process.platform;
    if (platform === "win32") {
      try {
        const { stdout } = await execAsync("wmic bios get serialnumber");
        const lines = stdout.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        if (lines.length >= 2) {
          const sn = lines[1];
          if (sn && sn.toLowerCase() !== "serialnumber") return { source: "wmic", serial: sn };
        }
      } catch (e) {
      }
      try {
        const { stdout } = await execAsync(
          'powershell -Command "Get-CimInstance -ClassName Win32_BIOS | Select-Object -ExpandProperty SerialNumber"'
        );
        const sn = stdout.trim();
        if (sn) return { source: "powershell", serial: sn };
      } catch (e) {
      }
    } else if (platform === "darwin") {
      try {
        const { stdout } = await execAsync("system_profiler SPHardwareDataType | awk '/Serial/ {print $4}'");
        const sn = stdout.trim();
        if (sn) return { source: "system_profiler", serial: sn };
      } catch (e) {
      }
      try {
        const { stdout } = await execAsync(`ioreg -l | awk -F\\" '/IOPlatformSerialNumber/{print $4; exit}'`);
        const sn = stdout.trim();
        if (sn) return { source: "ioreg", serial: sn };
      } catch (e) {
      }
    } else {
      try {
        const { stdout } = await execAsync("cat /sys/class/dmi/id/product_serial");
        const sn = stdout.trim();
        if (sn && sn !== "None") return { source: "/sys/class/dmi", serial: sn };
      } catch (e) {
      }
      try {
        const { stdout } = await execAsync("dmidecode -s system-serial-number");
        const sn = stdout.trim();
        if (sn) return { source: "dmidecode", serial: sn };
      } catch (e) {
      }
    }
    console.warn("⚠️ No serial found, returning null");
    return { source: "none", serial: null };
  } catch (err) {
    console.error("getMachineSerial error", err);
    return { source: "error", error: String(err) };
  }
});
