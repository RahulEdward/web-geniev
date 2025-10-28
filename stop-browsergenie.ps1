# Stop BrowserGenie Script
Write-Host "🧞 Stopping BrowserGenie..." -ForegroundColor Cyan

$processes = Get-Process -Name "BrowserGenie_server" -ErrorAction SilentlyContinue

if ($processes) {
    foreach ($proc in $processes) {
        Write-Host "Stopping process ID: $($proc.Id)" -ForegroundColor Yellow
        Stop-Process -Id $proc.Id -Force
    }
    Start-Sleep -Seconds 1
    Write-Host "✅ BrowserGenie stopped!" -ForegroundColor Green
} else {
    Write-Host "ℹ️  BrowserGenie is not running" -ForegroundColor Yellow
}
