@echo off
setlocal enabledelayedexpansion
title Subir cambios a GitHub - Galaxia Centurion

REM Se coloca en la carpeta donde esta este script (la del proyecto)
cd /d "%~dp0"

echo ==========================================
echo   Galaxia Centurion - Subir cambios
echo ==========================================
echo.

REM Comprueba que estamos dentro de un repositorio git
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Esta carpeta no es un repositorio git.
    echo Asegurate de que este script esta dentro de la carpeta del proyecto.
    pause
    exit /b 1
)

echo Comprobando si hay cambios...
git add -A

git diff --cached --quiet
if not errorlevel 1 (
    echo No hay cambios nuevos que subir. Todo esta ya actualizado.
    pause
    exit /b 0
)

echo.
echo Estos son los cambios que se van a subir:
echo ------------------------------------------
git status --short
echo ------------------------------------------
echo.

set "mensaje="
set /p mensaje=Escribe una breve descripcion de los cambios (o deja vacio para usar la fecha):

if "%mensaje%"=="" (
    for /f "tokens=1-4 delims=/ " %%a in ("%date%") do set "fecha=%%a-%%b-%%c"
    set "mensaje=Actualizacion del !fecha! !time!"
)

git commit -m "%mensaje%"
if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo crear el commit. Revisa el mensaje de arriba.
    pause
    exit /b 1
)

echo.
echo Subiendo a GitHub...
git push
if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo subir a GitHub. Revisa tu conexion o el mensaje de arriba.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo   Cambios subidos correctamente.
echo   GitHub Pages tardara 1-2 minutos en
echo   actualizar la pagina web.
echo ==========================================
pause
