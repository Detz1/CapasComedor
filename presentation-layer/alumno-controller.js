// presentation-layer/alumno-controller.js

const express = require('express');
const alumnoService = require('../business-layer/alumno-service');

const router = express.Router();

// Obtener todos los alumnos
router.get('/alumnos', (req, res) => {
  alumnoService.getAllAlumnos((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error obteniendo alumnos');
    } else {
      res.json(result);
    }
  });
});

// Obtener un alumno por DNI
router.get('/alumnos/:dni', (req, res) => {
  const dni = req.params.dni;
  alumnoService.getAlumnoByDNI(dni, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error obteniendo alumno por DNI');
    } else {
      res.json(result[0]);
    }
  });
});

// Agregar un nuevo alumno
router.post('/alumnos', (req, res) => {
  const newAlumno = req.body;
  alumnoService.addAlumno(newAlumno, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error agregando nuevo alumno');
    } else {
      res.status(201).json({ message: 'Alumno agregado correctamente', dni: result.insertId });
    }
  });
});

// Actualizar un alumno por DNI
router.put('/alumnos/:dni', (req, res) => {
  const dni = req.params.dni;
  const updatedAlumno = req.body;
  alumnoService.updateAlumno(dni, updatedAlumno, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error actualizando alumno por DNI');
    } else {
      res.status(200).json({ message: 'Alumno actualizado correctamente', dni });
    }
  });
});

// Eliminar un alumno por DNI
router.delete('/alumnos/:dni', (req, res) => {
  const dni = req.params.dni;
  alumnoService.deleteAlumno(dni, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error eliminando alumno por DNI');
    } else {
      res.status(200).json({ message: 'Alumno eliminado correctamente', dni });
    }
  });
});

// Otras rutas y controladores para operaciones relacionadas con alumnos
// ...

module.exports = router;
