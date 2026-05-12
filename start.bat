@echo off
title TenantEase - Launching...
color 0A
cls

echo.
echo  =====================================================
echo    TenantEase  --  Full Stack Property Management
echo    (c) 2026  Tina Rathore ^& Bhavya Bindal
echo  =====================================================
echo.

REM ── Kill any leftover node processes so ports are free ──
echo  [0/3] Clearing old server processes...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM ── Start Backend in a new terminal window ──
echo  [1/3] Starting Backend API  (port 3000)...
start "TenantEase - Backend" cmd /k "color 0B && title TenantEase Backend && cd /d "%~dp0backend" && npm run dev"

REM ── Wait for backend to boot (8 seconds) ──
echo        Waiting for backend to boot...
timeout /t 8 /nobreak >nul

REM ── Start Frontend in a new terminal window ──
echo  [2/3] Starting Frontend     (port 5173)...
start "TenantEase - Frontend" cmd /k "color 0D && title TenantEase Frontend && cd /d "%~dp0app" && npm run dev"

REM ── Wait for Vite to compile (10 seconds) ──
echo        Waiting for frontend to compile...
timeout /t 10 /nobreak >nul

REM ── Open Browser ──
echo  [3/3] Opening browser at http://localhost:5173 ...
start "" "http://localhost:5173"

echo.
echo  =====================================================
echo   All systems GO!
echo.
echo   Backend  API  :  http://localhost:3000/health
echo   Frontend App  :  http://localhost:5173
echo   Contact Page  :  http://localhost:5173/contact
echo.
echo   Login as Manager :  manager@tenantease.com
echo   Password         :  password123
echo  =====================================================
echo.
echo  [Press any key to close this launcher window]
pause >nul
