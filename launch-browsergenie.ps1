# BrowserGenie Launcher Script
Write-Host "Starting BrowserGenie..." -ForegroundColor Cyan

$serverPath = ".\downloads\rebranded\Chrome-bin\137.0.7218.69\BrowserGenieServer\default"
$serverExe = "BrowserGenie_server.exe"

# Default ports
$httpMcpPort = 3000
$cdpPort = 9222
$agentPort = 9223
$extensionPort = 9224

# Check if already running
$existing = Get-Process -Name "BrowserGenie_server" -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "BrowserGenie is already running (PID: $($existing.Id))" -ForegroundColor Yellow
    Write-Host "Stopping existing instance..." -ForegroundColor Yellow
    Stop-Process -Id $existing.Id -Force
    Start-Sleep -Seconds 2
    Write-Host "Stopped existing instance" -ForegroundColor Green
}

# Start BrowserGenie
Write-Host "`nStarting BrowserGenie with ports:" -ForegroundColor Yellow
Write-Host "  - HTTP MCP Port: $httpMcpPort"
Write-Host "  - CDP Port: $cdpPort"
Write-Host "  - Agent Port: $agentPort"
Write-Host "  - Extension Port: $extensionPort"

$fullPath = Join-Path $PSScriptRoot $serverPath
$exePath = Join-Path $fullPath $serverExe

if (-not (Test-Path $exePath)) {
    Write-Host "Error: BrowserGenie executable not found at: $exePath" -ForegroundColor Red
    exit 1
}

# Start the process
$process = Start-Process -FilePath $exePath `
    -ArgumentList "--http-mcp-port $httpMcpPort --cdp-port $cdpPort --agent-port $agentPort --extension-port $extensionPort" `
    -WorkingDirectory $fullPath `
    -PassThru

Start-Sleep -Seconds 3

# Check if it's running
$running = Get-Process -Id $process.Id -ErrorAction SilentlyContinue
if ($running) {
    Write-Host "`nBrowserGenie is running!" -ForegroundColor Green
    Write-Host "   Process ID: $($process.Id)"
    Write-Host "   Memory: $([math]::Round($running.WorkingSet64/1MB,2)) MB"
    Write-Host "`nAccess Points:" -ForegroundColor Cyan
    Write-Host "   - MCP Server: http://localhost:$httpMcpPort"
    Write-Host "   - CDP: ws://localhost:$cdpPort"
    Write-Host "   - Agent: ws://localhost:$agentPort"
    Write-Host "   - Extension: ws://localhost:$extensionPort"
    Write-Host "`nTo stop: .\stop-browsergenie.ps1" -ForegroundColor Yellow
} else {
    Write-Host "Failed to start BrowserGenie" -ForegroundColor Red
    exit 1
}
