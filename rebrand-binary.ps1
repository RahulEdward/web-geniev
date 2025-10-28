# BrowserGenie Binary Rebrand Script
param(
    [string]$SourceBinary = "..\BrowserOS_v0.28.0.exe"
)

$separator = "=" * 60
Write-Host "🧞 BrowserGenie Binary Rebrand Tool" -ForegroundColor Cyan
Write-Host $separator

# Configuration
$downloadPath = ".\downloads\BrowserOS_installer.exe"
$extractPath = ".\downloads\extracted"
$rebrandPath = ".\downloads\rebranded"

# Create directories
Write-Host "`n📁 Creating directories..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path ".\downloads" | Out-Null
New-Item -ItemType Directory -Force -Path $extractPath | Out-Null
New-Item -ItemType Directory -Force -Path $rebrandPath | Out-Null

# Copy the downloaded binary
if (Test-Path $SourceBinary) {
    Write-Host "`n📋 Copying BrowserOS binary..." -ForegroundColor Yellow
    Copy-Item -Path $SourceBinary -Destination $downloadPath -Force
    $fileSize = (Get-Item $downloadPath).Length / 1MB
    Write-Host "✅ Binary copied! Size: $([math]::Round($fileSize, 2)) MB" -ForegroundColor Green
} else {
    Write-Host "❌ Source binary not found: $SourceBinary" -ForegroundColor Red
    exit 1
}

# Extract installer
Write-Host "`n📦 Extracting installer..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..."

# Check if 7-Zip is available
$7zipPath = "C:\Program Files\7-Zip\7z.exe"
if (Test-Path $7zipPath) {
    & $7zipPath x $downloadPath -o"$extractPath" -y
    Write-Host "✅ Extraction complete!" -ForegroundColor Green
} else {
    Write-Host "⚠️  7-Zip not found at: $7zipPath" -ForegroundColor Yellow
    Write-Host "   Trying alternative extraction..." -ForegroundColor Yellow
    try {
        Expand-Archive -Path $downloadPath -DestinationPath $extractPath -Force
        Write-Host "✅ Extraction complete!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Could not extract. Install 7-Zip from: https://www.7-zip.org/" -ForegroundColor Red
        exit 1
    }
}

# Rebrand text files
Write-Host "`n🎨 Rebranding text files..." -ForegroundColor Yellow

$textExtensions = @('.json', '.html', '.js', '.css', '.txt', '.xml', '.config', '.manifest')
$filesToRebrand = Get-ChildItem -Path $extractPath -Recurse -File | Where-Object {
    $textExtensions -contains $_.Extension
}

$rebrandCount = 0
foreach ($file in $filesToRebrand) {
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content
        
        # Apply rebranding
        $content = $content -replace 'BrowserOS', 'BrowserGenie'
        $content = $content -replace 'browserOS', 'browserGenie'
        $content = $content -replace 'BROWSEROS', 'BROWSERGENIE'
        $content = $content -replace 'browseros', 'browsergenie'
        
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $rebrandCount++
        }
    } catch {
        # Skip files that can't be read
    }
}

Write-Host "✅ Rebranded $rebrandCount text files!" -ForegroundColor Green

# Rename files
Write-Host "`n📝 Renaming files..." -ForegroundColor Yellow
$renameCount = 0
Get-ChildItem -Path $extractPath -Recurse -File | Where-Object {
    $_.Name -match 'BrowserOS|browseros'
} | ForEach-Object {
    $newName = $_.Name -replace 'BrowserOS', 'BrowserGenie' -replace 'browseros', 'browsergenie'
    $newPath = Join-Path $_.Directory.FullName $newName
    if ($newPath -ne $_.FullName) {
        Move-Item -Path $_.FullName -Destination $newPath -Force
        Write-Host "   $($_.Name) → $newName" -ForegroundColor Gray
        $renameCount++
    }
}
Write-Host "✅ Renamed $renameCount files!" -ForegroundColor Green

# Copy to rebrand folder
Write-Host "`n📋 Copying rebranded files..." -ForegroundColor Yellow
Copy-Item -Path "$extractPath\*" -Destination $rebrandPath -Recurse -Force
Write-Host "✅ Files copied to: $rebrandPath" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host $separator
Write-Host "🎉 Rebrand Complete!" -ForegroundColor Green
Write-Host "`n📍 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Check rebranded files in: $rebrandPath"
Write-Host "   2. Test the application"
Write-Host "   3. Create new installer with Inno Setup or NSIS"
Write-Host "`n💡 Tip: Use Resource Hacker to change icons and version info"
Write-Host ""
Write-Host $separator
