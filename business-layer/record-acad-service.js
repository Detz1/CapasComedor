// business-layer/record-acad-service.js

const recordAcadModel = require('../data-layer/record-acad-model');

class RecordAcadService {
  getRecordAcadByDNI(dni, callback) {
    recordAcadModel.getRecordAcadByDNI(dni, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      if (!result || result.length === 0 || typeof result[0].dni === 'undefined') {
        return callback(new Error('Registro académico no encontrado o sin DNI'), null);
      }

      const recordAcad = result[0];
      const dniEstudiante = recordAcad.dni;

      console.log('DNI del estudiante en el registro académico:', dniEstudiante);

      // Resto del código...
    });
  }




  addRecordAcad(recordAcad, callback) {
    // Aquí puedes agregar lógica adicional antes de agregar el registro académico
    recordAcadModel.addRecordAcad(recordAcad, callback);
  }

  updateRecordAcad(dni, updatedRecordAcad, callback) {
    // Aquí puedes agregar lógica adicional antes de actualizar el registro académico
    recordAcadModel.updateRecordAcad(dni, updatedRecordAcad, callback);
  }

  deleteRecordAcad(dni, callback) {
    // Aquí puedes agregar lógica adicional antes de eliminar el registro académico
    recordAcadModel.deleteRecordAcad(dni, callback);
  }

  // Otras operaciones relacionadas con el registro académico
}

module.exports = new RecordAcadService();
