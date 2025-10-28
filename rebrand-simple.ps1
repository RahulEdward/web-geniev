# Simple BrowserGenie Rebrand Script
Write-Host "BrowserGenie Binary Rebrand Tool" -ForegroundColor Cyan
Write-Host "============================================================"

$sourceBinary = "D:\browser-warrior\BrowserOS_v0.28.0.exe"
$extractPath = ".\downloads\extracted"
$rebrandPath = ".\downloads\rebranded"

# Create directories
Write-Host "`nCreating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path ".\downloads" | Out-Null
New-Item -ItemType Directory -Force -Path $extractPath | Out-Null
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
Write-Host "`nExtracting installer..." -ForegroundColor Yellow
$7zipPath = "C:\Program Files\7-Zip\7z.exe"

if (Test-Path $7zipPath) {
    Write-Host "Using 7-Zip to extract..."
    & $7zipPath x $sourceBinary -o"$extractPath" -y
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Extraction complete!" -ForegroundColor Green
    } else {
        Write-Host "Extraction failed!" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "7-Zip not found. Please install from: https://www.7-zip.org/" -ForegroundColor Red
    Write-Host "Or extract manually and place files in: $extractPath" -ForegroundColor Yellow
    exit 1
}

# Rebrand text files
Write-Host "`nRebranding text files..." -ForegroundColor Yellow
$textExtensions = @('.json', '.html', '.js', '.css', '.txt', '.xml', '.config', '.manifest')
$filesToRebrand = Get-ChildItem -Path $extractPath -Recurse -File | Where-Object { $textExtensions -contains $_.Extension }

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
        }
    } catch {
        # Skip files that cannot be read
    }
}

Write-Host "Rebranded $rebrandCount text files!" -ForegroundColor Green

# Rename files
Write-Host "`nRenaming files..." -ForegroundColor Yellow
$renameCount = 0
Get-ChildItem -Path $extractPath -Recurse -File | Where-Object { $_.Name -match 'BrowserOS|browseros' } | ForEach-Object {
    $newName = $_.Name -replace 'BrowserOS', 'BrowserGenie' -replace 'browseros', 'browsergenie'
    $newPath = Join-Path $_.Directory.FullName $newName
    if ($newPath -ne $_.FullName) {
        Move-Item -Path $_.FullName -Destination $newPath -Force
        $renameCount++
    }
}
Write-Host "Renamed $renameCount files!" -ForegroundColor Green

# Copy to rebrand folder
Write-Host "`nCopying rebranded files..." -ForegroundColor Yellow
Copy-Item -Path "$extractPath\*" -Destination $rebrandPath -Recurse -Force
Write-Host "Files copied to: $rebrandPath" -ForegroundColor Green

# Summary
Write-Host "`n============================================================"
Write-Host "Rebrand Complete!" -ForegroundColor Green
Write-Host "`nNext Steps:" -ForegroundColor Cyan
Write-Host "1. Check rebranded files in: $rebrandPath"
Write-Host "2. Test the application"
Write-Host "3. Create new installer"
Write-Host "============================================================"
