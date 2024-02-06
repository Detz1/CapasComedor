// business-layer/alumno-service.js

const alumnoModel = require('../data-layer/alumno-model');

class AlumnoService {
  getAllAlumnos(callback) {
    alumnoModel.getAllAlumnos(callback);
  }

  getAlumnoByDNI(dni, callback) {
    alumnoModel.getAlumnoByDNI(dni, callback);
  }

  getAlumnoDetailsByDNI(dni, callback) {
    // Obtener información del alumno desde el modelo
    alumnoModel.getAlumnoByDNI(dni, (err, alumno) => {
      if (err) {
        return callback(err, null);
      }

      if (!alumno) {
        return callback(null, null); // Alumno no encontrado
      }

      // Obtener información académica del alumno utilizando RecordAcadService
      recordAcadService.getRecordAcadByDNI(dni, (err, recordAcad) => {
        if (err) {
          return callback(err, null);
        }

        // Combinar información del alumno y del registro académico
        const alumnoDetails = {
          dni: alumno.dni,
          nombre: alumno.nombre,
          email: alumno.email,
          estado: alumno.estado,
          facultad: alumno.facultad,
          recordAcad: recordAcad,
        };

        return callback(null, alumnoDetails);
      });
    });
  }

  addAlumno(alumno, callback) {
    // Aquí puedes agregar lógica adicional antes de agregar al alumno
    alumnoModel.addAlumno(alumno, callback);
  }

  updateAlumno(dni, updatedAlumno, callback) {
    // Aquí puedes agregar lógica adicional antes de actualizar al alumno
    alumnoModel.updateAlumno(dni, updatedAlumno, callback);
  }

  deleteAlumno(dni, callback) {
    // Aquí puedes agregar lógica adicional antes de eliminar al alumno
    alumnoModel.deleteAlumno(dni, callback);
  }

  // Otras operaciones relacionadas con alumnos
}

module.exports = new AlumnoService();
