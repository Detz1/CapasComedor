// presentation-layer/record-acad-controller.js

const express = require('express');
const recordAcadService = require('../business-layer/record-acad-service');

const router = express.Router();

// Obtener el registro académico por DNI
router.get('/record-acad/:dni', (req, res) => {
  const dni = req.params.dni;
  recordAcadService.getRecordAcadByDNI(dni, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error obteniendo registro académico por DNI');
    } else {
      res.json(result[0]);
    }
  });
});

// Agregar un nuevo registro académico
router.post('/record-acad', (req, res) => {
  const newRecordAcad = req.body;
  recordAcadService.addRecordAcad(newRecordAcad, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error agregando nuevo registro académico');
    } else {
      res.status(201).json({ message: 'Registro académico agregado correctamente', dni: result.insertId });
    }
  });
});

// Actualizar el registro académico por DNI
router.put('/record-acad/:dni', (req, res) => {
  const dni = req.params.dni;
  const updatedRecordAcad = req.body;
  recordAcadService.updateRecordAcad(dni, updatedRecordAcad, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error actualizando registro académico por DNI');
    } else {
      res.status(200).json({ message: 'Registro académico actualizado correctamente', dni });
    }
  });
});

// Eliminar el registro académico por DNI
router.delete('/record-acad/:dni', (req, res) => {
  const dni = req.params.dni;
  recordAcadService.deleteRecordAcad(dni, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error eliminando registro académico por DNI');
    } else {
      res.status(200).json({ message: 'Registro académico eliminado correctamente', dni });
    }
  });
});

// Otras rutas y controladores para operaciones relacionadas con el registro académico
// ...

module.exports = router;
