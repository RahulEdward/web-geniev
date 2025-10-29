# BrowserGenie Extension Manual Installer
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   BrowserGenie Extension Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$extensionPath = Join-Path $PSScriptRoot "packages\browsergenie-agent\dist"

if (-not (Test-Path $extensionPath)) {
    Write-Host "Extension not found. Building now..." -ForegroundColor Yellow
    Set-Location "packages\browsergenie-agent"
    yarn build
    Set-Location $PSScriptRoot
}

Write-Host "Extension location:" -ForegroundColor Green
Write-Host $extensionPath -ForegroundColor White
Write-Host ""

Write-Host "MANUAL INSTALLATION STEPS:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Chrome and go to:" -ForegroundColor White
Write-Host "   chrome://extensions/" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Enable 'Developer mode' (top right toggle)" -ForegroundColor White
Write-Host ""
Write-Host "3. Click 'Load unpacked' button" -ForegroundColor White
Write-Host ""
Write-Host "4. Select this folder:" -ForegroundColor White
Write-Host "   $extensionPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Extension will load!" -ForegroundColor White
Write-Host ""
Write-Host "6. Pin the extension:" -ForegroundColor White
Write-Host "   - Click puzzle icon in toolbar" -ForegroundColor Gray
Write-Host "   - Find 'BrowserGenie AI Agent'" -ForegroundColor Gray
Write-Host "   - Click pin icon" -ForegroundColor Gray
Write-Host ""
Write-Host "7. Use BrowserGenie:" -ForegroundColor White
Write-Host "   - Click BrowserGenie icon" -ForegroundColor Gray
Write-Host "   - Or press Ctrl+E" -ForegroundColor Gray
Write-Host ""

# Copy path to clipboard
Set-Clipboard -Value $extensionPath
Write-Host "Extension path copied to clipboard!" -ForegroundColor Green
Write-Host ""

# Open Chrome extensions page
$chromePaths = @(
    "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "${env:LOCALAPPDATA}\Google\Chrome\Application\chrome.exe"
)

$chromePath = $null
foreach ($path in $chromePaths) {
    if (Test-Path $path) {
        $chromePath = $path
        break
    }
}

if ($chromePath) {
    Write-Host "Opening Chrome extensions page..." -ForegroundColor Cyan
    Start-Process -FilePath $chromePath -ArgumentList "chrome://extensions/"
    Start-Sleep -Seconds 2
    Write-Host ""
    Write-Host "Now follow the steps above!" -ForegroundColor Yellow
} else {
    Write-Host "Chrome not found. Please open Chrome manually." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press Enter to exit..."
Read-Host
