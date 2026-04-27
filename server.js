const express = require('express');
const path = require('path');
const os = require('os'); 
const app = express();
const PORT = 5000;

const baseDir = process.cwd();

// --- NUEVO: MIDDLEWARE DE DIAGNÓSTICO ---
app.use((req, res, next) => {
    const ahora = new Date().toLocaleTimeString();
    console.log(`[${ahora}] Solicitud: ${req.url}`);
    
    // Forzamos al navegador a NO guardar caché mientras desarrollas
    // Esto ayuda a que el teléfono no se quede con versiones viejas
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

// Prueba de vida del servidor
app.get('/ping', (req, res) => {
    console.log("¡El celular se conectó con éxito al servidor!");
    res.send("<h1>Servidor T.O.R.O. conectado correctamente</h1>");
});

// Servir archivos estáticos
app.use(express.static(baseDir));

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
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log('======================================================');
    console.log('         SISTEMA T.O.R.O. - SERVIDOR ACTIVO');
    console.log('======================================================');
    console.log(` Directorio base: ${baseDir}`);
    console.log(` IP Local: http://${LAN_IP}:${PORT}`);
    console.log('------------------------------------------------------');
    console.log(' MONITOR DE ACTIVIDAD (Mira aquí cuando uses el celular):');
});