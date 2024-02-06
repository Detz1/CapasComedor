// presentation-layer/solicitud-controller.js

const express = require('express');
const solicitudService = require('../business-layer/solicitud-service');

const router = express.Router();

// Obtener todas las solicitudes
router.get('/solicitudes', (req, res) => {
  solicitudService.getAllSolicitudes((err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error obteniendo solicitudes');
    } else {
      res.json(result);
    }
  });
});

// Obtener una solicitud por ID
router.get('/solicitudes/:id', (req, res) => {
  const solicitudId = req.params.id;
  solicitudService.getSolicitudById(solicitudId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error obteniendo solicitud por ID');
    } else {
      if (!result) {
        // Si la solicitud no existe o no se encontró, devolver un mensaje o código de estado adecuado
        res.status(404).send('Solicitud no encontrada');
      } else {
        // Si la solicitud se encontró, devolver el resultado
        res.json(result);
      }
    }
  });
});

// Agregar una nueva solicitud
router.post('/solicitudes', (req, res) => {
  const newSolicitud = req.body;
  solicitudService.addSolicitud(newSolicitud, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error agregando nueva solicitud');
    } else {
      res.status(201).json({ message: 'Solicitud agregada correctamente', id: result.insertId });
    }
  });
});

// Actualizar una solicitud por ID
router.put('/solicitudes/:id', (req, res) => {
  const solicitudId = req.params.id;
  const updatedSolicitud = req.body;
  solicitudService.updateSolicitud(solicitudId, updatedSolicitud, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error actualizando solicitud por ID');
    } else {
      res.status(200).json({ message: 'Solicitud actualizada correctamente', id: solicitudId });
    }
  });
});

// Eliminar una solicitud por ID
router.delete('/solicitudes/:id', (req, res) => {
  const solicitudId = req.params.id;
  solicitudService.deleteSolicitud(solicitudId, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error eliminando solicitud por ID');
    } else {
      res.status(200).json({ message: 'Solicitud eliminada correctamente', id: solicitudId });
    }
  });
});

// Otras rutas y controladores para operaciones relacionadas con las solicitudes
// ...

module.exports = router;
