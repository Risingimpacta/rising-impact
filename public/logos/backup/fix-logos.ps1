# Requires ImageMagick installed → https://imagemagick.org

$folder = "C:\Users\Rising Impact\Documents\risingimpactweb\public\logos"

# Create backup folder
$backup = "$folder\backup"
if (!(Test-Path $backup)) { New-Item -ItemType Directory -Path $backup }

Get-ChildItem -Path $folder | ForEach-Object {

    # Skip backup folder
    if ($_.FullName -like "*backup*") { return }

    # Backup original
    Copy-Item $_.FullName $backup

    $name = $_.BaseName
    $ext = $_.Extension.ToLower()
    
    # Normalize filename
    $fixed = $name.ToLower() -replace " ", "-" -replace "_", "-"
    $newPath = "$folder\$fixed$ext"

    # Rename
    if ($_.FullName -ne $newPath) {
        Rename-Item $_.FullName $newPath -Force
    }

    # Convert JPG/JPEG/WebP → PNG
    if ($ext -in (".jpg", ".jpeg", ".webp")) {
        & magick convert $newPath -resize 256x256^> -strip "$folder\$fixed.png"
        Remove-Item $newPath
    }
    elseif ($ext -eq ".png") {
        # Ensure correct size and strip metadata
        & magick convert $newPath -resize 256x256^> -strip $newPath
    }
}

Write-Host "Logos processed successfully!"
