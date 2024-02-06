// data-layer/db.js

const mysql = require('mysql2');

// Configuración de la conexión a la base de datos de alumnos
const alumnosDBConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysql_detz16',
  database: 'alumnos',
};

// Configuración de la conexión a la base de datos de registro
const registroDBConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysql_detz16',
  database: 'registro',
};

// Configuración de la conexión a la base de datos de solicitudes
const solicitudDBConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mysql_detz16',
  database: 'solicitud',
};


// Crear conexiones a las bases de datos
const alumnosDB = mysql.createConnection(alumnosDBConfig);
const registroDB = mysql.createConnection(registroDBConfig);
const solicitudDB = mysql.createConnection(solicitudDBConfig);

// Conectar a las bases de datos
alumnosDB.connect();
registroDB.connect();
solicitudDB.connect();

// Exportar las conexiones
module.exports = {
  alumnosDB,
  registroDB,
  solicitudDB,
};

