import mysql from 'mysql2/promise';

const conexion = mysql.createPool({
    host: "localhost",
    database: "asistencia_is",
    user: "root",
    password: "",
});

export default conexion;