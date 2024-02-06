// data-layer/solicitud-model.js

const { solicitudDB } = require('./db');

class SolicitudModel {
  getAllSolicitudes(callback) {
    solicitudDB.query('SELECT * FROM solicitud_registro', callback);
  }

  getSolicitudById(id, callback) {
    solicitudDB.query('SELECT * FROM solicitud_registro WHERE id = ?', [id], callback);
  }

  addSolicitud(solicitud, callback) {
    solicitudDB.query('INSERT INTO solicitud_registro SET ?', solicitud, callback);
  }

  updateSolicitud(id, updatedSolicitud, callback) {
    solicitudDB.query('UPDATE solicitud_registro SET ? WHERE id = ?', [updatedSolicitud, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar la solicitud:', err);
        return callback(err, null);
      }
  
      console.log('Resultado de la actualización:', result);
  
      // Resto del código...
    });
  }

    deleteSolicitud(id, callback) {
    solicitudDB.query('DELETE FROM solicitud_registro WHERE id = ?', [id], callback);
    }


  // Otras operaciones para la tabla 'solicitud_registro'
}

module.exports = new SolicitudModel();
