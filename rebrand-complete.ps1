# Complete BrowserGenie Rebrand Script
Write-Host "BrowserGenie Binary Rebrand Tool" -ForegroundColor Cyan
Write-Host "============================================================"

$sourceBinary = "D:\browser-warrior\BrowserOS_v0.28.0.exe"
$extractPath = ".\downloads\extracted"
$chromeExtractPath = ".\downloads\chrome"
$rebrandPath = ".\downloads\rebranded"

# Create directories
Write-Host "`nCreating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path ".\downloads" | Out-Null
New-Item -ItemType Directory -Force -Path $extractPath | Out-Null
New-Item -ItemType Directory -Force -Path $chromeExtractPath | Out-Null
New-Item -ItemType Directory -Force -Path $rebrandPath | Out-Null

# Check if source exists
if (-not (Test-Path $sourceBinary)) {
    Write-Host "Error: Source binary not found at $sourceBinary" -ForegroundColor Red
    exit 1
}

Write-Host "Source binary found!" -ForegroundColor Green
$fileSize = (Get-Item $sourceBinary).Length / 1MB
Write-Host "File size: $([math]::Round($fileSize, 2)) MB"

# Extract with 7-Zip
Write-Host "`nStep 1: Extracting installer..." -ForegroundColor Yellow
$7zipPath = "C:\Program Files\7-Zip\7z.exe"

if (-not (Test-Path $7zipPath)) {
    Write-Host "7-Zip not found. Please install from: https://www.7-zip.org/" -ForegroundColor Red
    exit 1
}

& $7zipPath x $sourceBinary -o"$extractPath" -y | Out-Null
Write-Host "Installer extracted!" -ForegroundColor Green

# Extract chrome.7z
$chrome7z = Join-Path $extractPath "chrome.7z"
if (Test-Path $chrome7z) {
    Write-Host "`nStep 2: Extracting chrome.7z..." -ForegroundColor Yellow
    & $7zipPath x $chrome7z -o"$chromeExtractPath" -y | Out-Null
    Write-Host "Chrome archive extracted!" -ForegroundColor Green
} else {
    Write-Host "Warning: chrome.7z not found!" -ForegroundColor Yellow
}

# Rebrand text files
Write-Host "`nStep 3: Rebranding text files..." -ForegroundColor Yellow
$textExtensions = @('.json', '.html', '.js', '.css', '.txt', '.xml', '.config', '.manifest', '.pak')
$filesToRebrand = Get-ChildItem -Path $chromeExtractPath -Recurse -File | Where-Object { $textExtensions -contains $_.Extension }

$rebrandCount = 0
foreach ($file in $filesToRebrand) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content
        
        $content = $content -replace 'BrowserOS', 'BrowserGenie'
        $content = $content -replace 'browserOS', 'browserGenie'
        $content = $content -replace 'BROWSEROS', 'BROWSERGENIE'
        $content = $content -replace 'browseros', 'browsergenie'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $rebrandCount++
            Write-Host "  Rebranded: $($file.Name)" -ForegroundColor Gray
        }
    } catch {
        # Skip binary files
    }
}

Write-Host "Rebranded $rebrandCount text files!" -ForegroundColor Green

# Rename files and folders
Write-Host "`nStep 4: Renaming files..." -ForegroundColor Yellow
$renameCount = 0

# Rename files first
Get-ChildItem -Path $chromeExtractPath -Recurse -File | Where-Object { $_.Name -match 'BrowserOS|browseros' } | ForEach-Object {
    $newName = $_.Name -replace 'BrowserOS', 'BrowserGenie' -replace 'browseros', 'browsergenie'
    $newPath = Join-Path $_.Directory.FullName $newName
    if ($newPath -ne $_.FullName) {
        Move-Item -Path $_.FullName -Destination $newPath -Force
        Write-Host "  $($_.Name) -> $newName" -ForegroundColor Gray
        $renameCount++
    }
}

# Rename directories
Get-ChildItem -Path $chromeExtractPath -Recurse -Directory | Sort-Object -Property FullName -Descending | Where-Object { $_.Name -match 'BrowserOS|browseros' } | ForEach-Object {
    $newName = $_.Name -replace 'BrowserOS', 'BrowserGenie' -replace 'browseros', 'browsergenie'
    $newPath = Join-Path $_.Parent.FullName $newName
    if ($newPath -ne $_.FullName) {
        Move-Item -Path $_.FullName -Destination $newPath -Force
        Write-Host "  $($_.Name) -> $newName" -ForegroundColor Gray
        $renameCount++
    }
}

Write-Host "Renamed $renameCount items!" -ForegroundColor Green

# Copy to rebrand folder
Write-Host "`nStep 5: Copying rebranded files..." -ForegroundColor Yellow
Copy-Item -Path "$chromeExtractPath\*" -Destination $rebrandPath -Recurse -Force
Write-Host "Files copied to: $rebrandPath" -ForegroundColor Green

# List some key files
Write-Host "`nKey files in rebranded folder:" -ForegroundColor Cyan
Get-ChildItem -Path $rebrandPath -File | Select-Object -First 10 | ForEach-Object {
    Write-Host "  - $($_.Name)" -ForegroundColor Gray
}

# Summary
Write-Host "`n============================================================"
Write-Host "Rebrand Complete!" -ForegroundColor Green
Write-Host "`nStatistics:" -ForegroundColor Cyan
Write-Host "  - Text files rebranded: $rebrandCount"
Write-Host "  - Files/folders renamed: $renameCount"
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Check rebranded files in: $rebrandPath"
Write-Host "2. Test the application"
Write-Host "3. Create new installer with Inno Setup or NSIS"
Write-Host "4. Use Resource Hacker to change icons and version info"
Write-Host "============================================================"
