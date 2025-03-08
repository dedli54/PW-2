//Script para probar la conexión

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Cambia si usas un servidor remoto
  user: 'root',      // Usuario de MySQL
  password: '', // Contraseña de MySQL
  database: '', // Nombre de tu base de datos
  port: 3306          // Puerto (predeterminado 3306)
});

connection.connect((err) => {
  if (err) {
    console.error('No jalo :c', err.message);
    return;
  }
  console.log('Jalo');
  connection.end();
});

