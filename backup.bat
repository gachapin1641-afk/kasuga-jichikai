@echo off
setlocal enabledelayedexpansion

set FILES=index.html style.css event_contents.html main.js

cd /d "%~dp0"

if not exist "backup\1" mkdir "backup\1"
if not exist "backup\2" mkdir "backup\2"
if not exist "backup\3" mkdir "backup\3"

echo.
echo === Backup start ===
echo.

del /q "backup\3\*" >nul 2>&1

for %%F in (%FILES%) do (
  if exist "backup\2\%%F" (
    move /y "backup\2\%%F" "backup\3\%%F" >nul
  )
)

for %%F in (%FILES%) do (
  if exist "backup\1\%%F" (
    move /y "backup\1\%%F" "backup\2\%%F" >nul
  )
)

for %%F in (%FILES%) do (
  if exist "%%F" (
    copy /y "%%F" "backup\1\%%F" >nul
    echo [OK] %%F saved to backup\1
  ) else (
    echo [SKIP] %%F not found
  )
)

echo.
echo === Backup done ===
echo   backup\1 = newest
echo   backup\2 = 1 generation ago
echo   backup\3 = 2 generations ago
echo.
pause
