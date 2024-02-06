// index.js

const express = require('express');
const bodyParser = require('body-parser');
const alumnoController = require('./presentation-layer/alumno-controller');
const recordAcadController = require('./presentation-layer/record-acad-controller');
const solicitudController = require('./presentation-layer/solicitud-controller');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el cuerpo de las solicitudes a formato JSON
app.use(express.json());

// Rutas principales
app.use('/api', alumnoController);
app.use('/api', recordAcadController);
app.use('/api', solicitudController);

// Agregar después de las rutas principales
app.get('/consult', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'consult.html'));
});

app.get('/consultas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'consulta.html'));
});
// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
