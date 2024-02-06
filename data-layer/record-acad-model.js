// data-layer/record-acad-model.js

const { registroDB } = require('./db');

class RecordAcadModel {
  getRecordAcadByDNI(dni, callback) {
    registroDB.query('SELECT * FROM record_acad WHERE dni = ?', [dni], callback);
  }

  getNivelAcademicoByDNI(dni, callback) {
    registroDB.query('SELECT niv_acad FROM record_acad WHERE dni = ?', [dni], callback);
  }

  addRecordAcad(recordAcad, callback) {
    registroDB.query('INSERT INTO record_acad SET ?', recordAcad, callback);
  }

  updateRecordAcad(dni, updatedRecordAcad, callback) {
    registroDB.query('UPDATE record_acad SET ? WHERE dni = ?', [updatedRecordAcad, dni], callback);
  }

  deleteRecordAcad(dni, callback) {
    registroDB.query('DELETE FROM record_acad WHERE dni = ?', [dni], callback);
  }

  // Otras operaciones para la tabla 'record_acad'
}

module.exports = new RecordAcadModel();
