# CascadeCraft Automated Git Commit & Push Script
param (
    [string]$Message = ""
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CascadeCraft Git Sync & Push Engine   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Check Git Status
$status = git status --porcelain
if (-not $status) {
    Write-Host "[OK] Working tree clean. Nothing to commit." -ForegroundColor Green
    exit 0
}

# Prompt message if not provided
if ([string]::IsNullOrWhiteSpace($Message)) {
    $now = Get-Date -Format "yyyy-MM-dd HH:mm"
    $inputMsg = Read-Host "請輸入 Commit 訊息 (直接按 Enter 預設: 'feat: update styles & modules [$now]')"
    if ([string]::IsNullOrWhiteSpace($inputMsg)) {
        $Message = "feat: update styles & modules [$now]"
    } else {
        $Message = $inputMsg
    }
}

Write-Host "`n[1/3] Adding changes to Git..." -ForegroundColor Yellow
git add -A

Write-Host "[2/3] Committing changes with message: '$Message'..." -ForegroundColor Yellow
git commit -m "$Message"

Write-Host "[3/3] Pushing to remote repository..." -ForegroundColor Yellow
try {
    # Check current branch
    $branch = git rev-parse --abbrev-ref HEAD
    git push origin $branch
    Write-Host "`n[SUCCESS] Successfully pushed to origin/$branch!" -ForegroundColor Green
} catch {
    Write-Host "`n[NOTICE] Remote push skipped or failed (check if remote 'origin' is configured)." -ForegroundColor DarkYellow
    Write-Host "Run: git remote add origin <your-repo-url> to connect remote repo." -ForegroundColor Gray
}

Write-Host "========================================" -ForegroundColor Cyan
