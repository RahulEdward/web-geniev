# BrowserGenie - AI Browser Extension Launcher
# Complete working extension with all features

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   🧞 BrowserGenie AI Browser Agent" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Find Chrome
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

if (-not $chromePath) {
    Write-Host "Chrome not found. Please install Google Chrome." -ForegroundColor Red
    Write-Host "Download: https://www.google.com/chrome/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Chrome found: $chromePath" -ForegroundColor Green

# Extension path
$extensionPath = Join-Path $PSScriptRoot "packages\browsergenie-agent\dist"

if (-not (Test-Path $extensionPath)) {
    Write-Host "Extension not built. Building now..." -ForegroundColor Yellow
    Set-Location "packages\browsergenie-agent"
    yarn build
    Set-Location $PSScriptRoot
}

Write-Host "Extension ready: $extensionPath" -ForegroundColor Green

# Profile directory
$profileDir = Join-Path $PSScriptRoot "BrowserGenie-Profile"
New-Item -ItemType Directory -Force -Path $profileDir | Out-Null

Write-Host ""
Write-Host "Starting BrowserGenie..." -ForegroundColor Cyan
Write-Host ""

# Launch with proper argument formatting
$args = "--load-extension=`"$extensionPath`" --user-data-dir=`"$profileDir`" --no-first-run --no-default-browser-check"

Start-Process -FilePath $chromePath -ArgumentList $args

Write-Host "BrowserGenie is running!" -ForegroundColor Green
Write-Host ""
Write-Host "Features:" -ForegroundColor Yellow
Write-Host "  - AI Chat Mode (talk to AI)" -ForegroundColor White
Write-Host "  - Agent Mode (AI controls browser)" -ForegroundColor White
Write-Host "  - Web Automation" -ForegroundColor White
Write-Host "  - Form Filling" -ForegroundColor White
Write-Host "  - Data Extraction" -ForegroundColor White
Write-Host "  - Screenshot Analysis" -ForegroundColor White
Write-Host ""
Write-Host "Quick Start:" -ForegroundColor Yellow
Write-Host "  1. Click extension icon (puzzle) in toolbar" -ForegroundColor White
Write-Host "  2. Pin 'BrowserGenie AI Agent'" -ForegroundColor White
Write-Host "  3. Click BrowserGenie icon or press Ctrl+E" -ForegroundColor White
Write-Host "  4. Configure AI in Settings" -ForegroundColor White
Write-Host ""
Write-Host "Free AI Option:" -ForegroundColor Yellow
Write-Host "  Install Ollama: https://ollama.ai/" -ForegroundColor White
Write-Host "  Run: ollama pull llama2" -ForegroundColor White
Write-Host "  Configure in BrowserGenie Settings" -ForegroundColor White
Write-Host ""
