// data-layer/alumno-model.js

const { alumnosDB } = require('./db');

class AlumnoModel {
  getAllAlumnos(callback) {
    alumnosDB.query('SELECT * FROM alumno', callback);
  }

  getAlumnoByDNI(dni, callback) {
    alumnosDB.query('SELECT * FROM alumno WHERE dni = ?', [dni], callback);
  }


  getAlumnoByEmail(email, callback) {
    alumnosDB.query('SELECT * FROM alumno WHERE email = ?', [email], callback);
  }

  addAlumno(alumno, callback) {
    alumnosDB.query('INSERT INTO alumno SET ?', alumno, callback);
  }

  updateAlumno(dni, updatedAlumno, callback) {
    alumnosDB.query('UPDATE alumno SET ? WHERE dni = ?', [updatedAlumno, dni], callback);
  }

  deleteAlumno(dni, callback) {
    alumnosDB.query('DELETE FROM alumno WHERE dni = ?', [dni], callback);
  }

  // Otras operaciones para la tabla 'alumno'
}

module.exports = new AlumnoModel();
