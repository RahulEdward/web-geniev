# BrowserOS to BrowserGenie Rebranding Script
Write-Host "Starting rebranding process..." -ForegroundColor Green

# Define replacements (order matters - most specific first)
$replacements = @(
    @{Old='browseros-ai'; New='browsergenie-ai'}
    @{Old='browserOS_ai'; New='browserGenie_ai'}
    @{Old='browseros_ai'; New='browsergenie_ai'}
    @{Old='browseros.com'; New='browsergenie.com'}
    @{Old='BrowserOS'; New='BrowserGenie'}
    @{Old='browserOS'; New='browserGenie'}
    @{Old='BROWSEROS'; New='BROWSERGENIE'}
    @{Old='browseros'; New='browsergenie'}
    @{Old='Nxtscape'; New='BrowserGenie'}
    @{Old='NXTSCAPE'; New='BROWSERGENIE'}
    @{Old='nxtscape'; New='browsergenie'}
)

# File extensions to process
$extensions = @('*.md', '*.json', '*.ts', '*.tsx', '*.js', '*.jsx', '*.html', '*.css', '*.yaml', '*.yml', '*.txt', '*.py')

# Get all files recursively (excluding node_modules, .git, dist)
$files = Get-ChildItem -Path . -Recurse -Include $extensions | Where-Object { 
    $_.FullName -notmatch '\\node_modules\\' -and 
    $_.FullName -notmatch '\\.git\\' -and 
    $_.FullName -notmatch '\\dist\\' -and
    $_.FullName -notmatch '\\build\\' -and
    $_.FullName -notmatch '\\.vscode\\' -and
    $_.Name -ne 'rebrand.ps1'
}

$totalFiles = $files.Count
$processedFiles = 0
$updatedFiles = 0

Write-Host "Found $totalFiles files to process" -ForegroundColor Cyan

foreach ($file in $files) {
    $processedFiles++
    Write-Progress -Activity "Rebranding files" -Status "Processing $($file.Name)" -PercentComplete (($processedFiles / $totalFiles) * 100)
    
    try {
        $content = Get-Content $file.FullName -Raw -ErrorAction Stop
        $originalContent = $content
        
        # Apply all replacements
        foreach ($replacement in $replacements) {
            $content = $content -replace [regex]::Escape($replacement.Old), $replacement.New
        }
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -NoNewline
            $updatedFiles++
        }
    }
    catch {
        Write-Host "Error processing $($file.FullName): $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Rebranding complete!" -ForegroundColor Green
Write-Host "Processed $processedFiles files" -ForegroundColor Cyan
Write-Host "Updated $updatedFiles files" -ForegroundColor Yellow
