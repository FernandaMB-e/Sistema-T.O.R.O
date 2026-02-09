@echo off
title Lanzador Sistema T.O.R.O.
setlocal enabledelayedexpansion

:: 1. Detectar la IP Local (IPv4) automáticamente
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr "IPv4"') do (
    set IP=%%a
    set IP=!IP: =!
)

echo ======================================================
echo           SISTEMA T.O.R.O. - SERVIDOR ACTIVO
echo ======================================================
echo.
echo  [PROFESOR]: Su sistema esta cargando...
echo  Se abrira una ventana en su navegador en breve.
echo.
echo  ------------------------------------------------------
echo  MSG PARA ALUMNOS:
echo  "Conectense a la siguiente direccion en sus dispositivos:"
echo.
echo           http://%IP%:5000
echo  ------------------------------------------------------
echo.
echo  IMPORTANTE: No cierre esta ventana mientras use el sistema.
echo ======================================================
echo.

:: 2. Abrir el navegador para el profesor
start http://localhost:5000

:: Ejecutar el servidor ocultando los logs de peticiones
node server.js > nul

pause