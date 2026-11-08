@echo off
chcp 65001 >nul
echo ========================================
echo   CascadeCraft Git Automated Sync Tool
echo ========================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0git-sync.ps1" %*

pause
