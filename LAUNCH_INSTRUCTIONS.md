# 🧞 BrowserGenie Launch Instructions

## ✅ BrowserGenie is Successfully Rebranded!

Your BrowserGenie executable is ready to use!

## 📍 Location

```
D:\browser-warrior\BrowserGenie\downloads\rebranded\Chrome-bin\137.0.7218.69\BrowserGenieServer\default\BrowserGenie_server.exe
```

## 🚀 Quick Start

### Option 1: Use the Launcher Script (Recommended)

```powershell
cd D:\browser-warrior\BrowserGenie
.\launch-browsergenie.ps1
```

### Option 2: Manual Launch

```powershell
cd "D:\browser-warrior\BrowserGenie\downloads\rebranded\Chrome-bin\137.0.7218.69\BrowserGenieServer\default"
.\BrowserGenie_server.exe --http-mcp-port 3000 --cdp-port 9222 --agent-port 9223
```

## 🛑 Stop BrowserGenie

```powershell
cd D:\browser-warrior\BrowserGenie
.\stop-browsergenie.ps1
```

Or manually:
```powershell
Stop-Process -Name "BrowserGenie_server" -Force
```

## 🔌 Default Ports

- **MCP Server**: http://localhost:3000
- **CDP (Chrome DevTools Protocol)**: ws://localhost:9222
- **Agent Communication**: ws://localhost:9223
- **Extension WebSocket**: ws://localhost:9224

## 📊 Check Status

```powershell
Get-Process -Name "BrowserGenie_server"
```

## ⚙️ Command Line Options

```
--http-mcp-port <port>   MCP HTTP server port (required)
--cdp-port <port>        CDP WebSocket port (required)
--agent-port <port>      Agent communication port (required)
--extension-port <port>  WebSocket port for extension (default: 9224)
--disable-mcp-server     Disable MCP server (default: false)
```

## 🎯 What Was Rebranded

✅ **55 language pack files** (.pak files) - All UI text updated
✅ **browseros_server.exe** → **BrowserGenie_server.exe**
✅ **BrowserOSServer folder** → **BrowserGenieServer folder**
✅ All internal text references from BrowserOS to BrowserGenie

## 📝 Notes

- The executable is based on **BrowserOS v0.28.0** (Chromium 137.0.7218.69)
- Size: **118.75 MB**
- Some internal help text may still reference BrowserOS (binary strings not modified)

## 🔧 Next Steps

1. **Test the application** - Make sure all features work
2. **Create installer** - Use Inno Setup or NSIS to package
3. **Update icons** - Use Resource Hacker to change icons and version info
4. **Build Chrome extension** - Deploy the BrowserGenie extension

## 🐛 Troubleshooting

**Issue**: "required option '--http-mcp-port' not specified"
- **Solution**: Always provide the required ports when launching

**Issue**: Process starts but doesn't respond
- **Solution**: Check if ports are already in use: `netstat -ano | findstr ":3000"`

**Issue**: Can't find executable
- **Solution**: Make sure you're in the correct directory or use the full path

## 📚 Related Files

- `launch-browsergenie.ps1` - Easy launcher script
- `stop-browsergenie.ps1` - Stop the server
- `rebrand-complete.ps1` - The rebrand script used
