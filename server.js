const express = require('express');
const path = require('path');
const os = require('os');
const app = express();
const PORT = 5000;

// Al usar '.' le indicamos que los archivos están en la misma carpeta que este script
app.use(express.static(path.join(__dirname, '.')));

// Forzamos que al entrar a la raíz se entregue el index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function obtenerIpLocal() {
    const interfaces = os.networkInterfaces();
    for (let nombre in interfaces) {
        for (let interfaz of interfaces[nombre]) {
            if (interfaz.family === 'IPv4' && !interfaz.internal) {
                return interfaz.address;
            }
        }
    }
    return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
    const IP_LOCAL = obtenerIpLocal();
    console.log(`\n==================================================`);
    console.log(`      SISTEMA T.O.R.O. - SERVIDOR ACTIVO`);
    console.log(`==================================================`);
    console.log(` Accede desde este equipo: http://localhost:${PORT}`);
    console.log(` Accede desde el móvil:    http://${IP_LOCAL}:${PORT}`);
    console.log(`==================================================\n`);
});