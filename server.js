const express = require('express');
const path = require('path');
const os = require('os'); 
const app = express();
const PORT = 5000;

// DETERMINAR RUTA DE ARCHIVOS (Crucial para el .exe)
// process.cwd() obliga al .exe a buscar los archivos en la carpeta de la USB
const baseDir = process.cwd();

// Middleware de Logs
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - [${res.statusCode}] - ${duration}ms`);
    });
    next();
});

// Servir archivos estáticos desde la carpeta actual de la USB
app.use(express.static(baseDir));

// Función para obtener la IP de tu PC en la red local
function getLocalIp() {
    const interfaces = os.networkInterfaces();
    for (const name in interfaces) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

const LAN_IP = getLocalIp();

app.listen(PORT, '0.0.0.0', () => {
    console.log('======================================================');
    console.log('         SISTEMA T.O.R.O. - SERVIDOR LAN ACTIVO');
    console.log('======================================================');
    console.log('');
    console.log(' [MENSAJE PARA ALUMNOS]:');
    console.log(` "Conectense a la red y entren a: http://${LAN_IP}:${PORT}"`);
    console.log('======================================================');
    console.log(' No cierre esta ventana mientras use el sistema.');
});