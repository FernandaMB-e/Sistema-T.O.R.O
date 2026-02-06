const express = require('express');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware para ver los códigos HTTP en la consola
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        // Imprime: MÉTODO | RUTA | CÓDIGO HTTP | TIEMPO
        console.log(`${req.method} ${req.originalUrl} - [${res.statusCode}] - ${duration}ms`);
    });
    next();
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, './')));

app.listen(PORT, '0.0.0.0', () => {
    console.log('====================================');
    console.log('   SISTEMA T.O.R.O. - MODO DEBUG');
    console.log('====================================');
    console.log(`Acceso Local: http://localhost:${PORT}`);
    console.log(`Acceso Alumnos: http://192.168.100.22:${PORT}`);
    console.log('Esperando conexiones...');
});