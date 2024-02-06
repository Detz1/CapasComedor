// business-layer/solicitud-service.js

const solicitudModel = require('../data-layer/solicitud-model');
const alumnoModel = require('../data-layer/alumno-model');
const recordAcadService = require('../business-layer/record-acad-service');

class SolicitudService {
    getAllSolicitudes(callback) {
        SolicitudModel.getAllSolicitudes(callback);
    }
    
    getSolicitudById(id, callback) {
        SolicitudModel.getSolicitudById(id, callback);
    }
    
    getSolicitudById(id, callback) {
        solicitudModel.getSolicitudById(id, (err, solicitudes) => {
          if (err) {
            return callback(err, null);
          }
      
          if (!solicitudes || solicitudes.length === 0 || typeof solicitudes[0].id === 'undefined') {
            return callback(new Error('Solicitud inválida o sin ID'), null);
          }
      
          const solicitud = solicitudes[0];
          const idSolicitud = solicitud.id;
      
          console.log('ID de la solicitud antes de consultar el registro académico:', idSolicitud);
      
          // Obtener información del registro académico usando el id como identificador
          recordAcadService.getRecordAcadByDNI(idSolicitud, (err, recordAcad) => {
            if (err) {
              return callback(err, null);
            }
      
            // Aplicar la lógica de la regla de negocio
            if (recordAcad && recordAcad.niv_acad !== 'medio superior' && recordAcad.ponderado_semes >= 12) {
              // Cambiar el estado de la solicitud a aprobado
              const updatedState = 'aprobado';
      
              // Actualizar la solicitud en la base de datos
              solicitudModel.updateSolicitud(idSolicitud, { estado: updatedState }, (err, result) => {
                if (err) {
                  console.error('Error al actualizar la solicitud:', err);
                  return callback(err, null);
                }
      
                console.log('Resultado de la actualización:', result);
      
                if (result.affectedRows === 0) {
                  // Si no se actualiza ninguna fila, podría ser útil saberlo
                  console.warn('Advertencia: No se actualizó ninguna fila.');
                }
      
                // Devolver la solicitud actualizada
                return callback(null, solicitud);
              });
            } else {
              // Cambiar el estado de la solicitud a denegado
              const updatedState = 'denegado';
      
              // Actualizar la solicitud en la base de datos
              solicitudModel.updateSolicitud(idSolicitud, { estado: updatedState }, (err, result) => {
                if (err) {
                  console.error('Error al actualizar la solicitud:', err);
                  return callback(err, null);
                }
      
                console.log('Resultado de la actualización:', result);
      
                if (result.affectedRows === 0) {
                  // Si no se actualiza ninguna fila, podría ser útil saberlo
                  console.warn('Advertencia: No se actualizó ninguna fila.');
                }
      
                // Devolver la solicitud actualizada
                return callback(null, solicitud);
              });
            }
          });
        });
      }

  addSolicitud(solicitud, callback) {
    // Validar si el DNI y el correo electrónico existen en la base de datos de alumnos
    alumnoModel.getAlumnoByDNI(solicitud.id, (err, existingAlumnoByDNI) => {
      if (err) {
        console.error(err);
        return callback({ message: 'Error al verificar el DNI del alumno' });
      }

      if (existingAlumnoByDNI.length === 0) {
        return callback({ message: 'El DNI no existe en la base de datos de alumnos' });
      }

      // Verificar también el correo electrónico
      alumnoModel.getAlumnoByEmail(solicitud.email, (err, existingAlumnoByEmail) => {
        if (err) {
          console.error(err);
          return callback({ message: 'Error al verificar el correo electrónico del alumno' });
        }

        if (existingAlumnoByEmail.length === 0) {
          return callback({ message: 'El correo electrónico no existe en la base de datos de alumnos' });
        }

        // Proceder a agregar la solicitud
        solicitudModel.addSolicitud(solicitud, callback);

         });
      });
    }

      

  updateSolicitudByDNI(dni, updatedSolicitud, callback) {
    // Aquí puedes agregar lógica adicional antes de actualizar la solicitud
    solicitudModel.updateSolicitud(id, updatedSolicitud, callback);
  }

  deleteSolicitud(id, callback) {
    // Aquí puedes agregar lógica adicional antes de eliminar la solicitud
    solicitudModel.deleteSolicitud(id, callback);
  }

  // Otras operaciones relacionadas con las solicitudes
}

module.exports = new SolicitudService();
