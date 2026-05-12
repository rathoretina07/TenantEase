@echo off
title TenantEase Launcher
color 0A

echo ============================================
echo   TenantEase - Full Stack App Launcher
echo   (c) 2026 Tina Rathore & Bhavya Bindal
echo ============================================
echo.
echo [1/2] Starting Backend API on port 3000...
start "TenantEase Backend" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend on port 5173...
start "TenantEase Frontend" cmd /k "cd /d %~dp0app && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo [3/3] Opening browser...
start http://localhost:5173

echo.
echo ============================================
echo   Both servers are starting up!
echo   Backend  : http://localhost:3000
echo   Frontend : http://localhost:5173
echo   Contact  : /contact
echo ============================================
pause
