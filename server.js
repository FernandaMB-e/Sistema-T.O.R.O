const express = require('express');
const path = require('path');
const os = require('os'); // Nuevo: para detectar tu IP real
const app = express();
const PORT = 5000;

// Middleware de Logs
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${req.method} ${req.originalUrl} - [${res.statusCode}] - ${duration}ms`);
    });
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, './')));

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
    console.log('====================================');
    console.log('   SISTEMA T.O.R.O. - SERVIDOR LAN');
    console.log('====================================');
    console.log(`💻 Local:   http://localhost:${PORT}`);
    console.log(`📱 Alumnos: http://${LAN_IP}:${PORT}`); // <--- ESTA ES LA IP QUE DEBES PONER EN EL CELULAR
    console.log('====================================');
});