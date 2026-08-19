$ErrorActionPreference = "Stop"

Write-Host "=== Préparation des ressources LSJ ===" -ForegroundColor Green

if (Test-Path ".\images") {
  New-Item -ItemType Directory -Force -Path ".\public\images" | Out-Null
  Copy-Item ".\images\*" ".\public\images\" -Recurse -Force
  Write-Host "Images copiées vers public/images"
} else {
  Write-Host "ATTENTION : dossier images absent." -ForegroundColor Yellow
}

if (Test-Path ".\audio") {
  New-Item -ItemType Directory -Force -Path ".\public\audio" | Out-Null
  Copy-Item ".\audio\*" ".\public\audio\" -Recurse -Force
  Write-Host "Audio copié vers public/audio"
} else {
  Write-Host "ATTENTION : dossier audio absent." -ForegroundColor Yellow
}

Write-Host "Terminé. Lance maintenant : npm install puis npm run dev" -ForegroundColor Cyan
