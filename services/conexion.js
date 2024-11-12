import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors()); 

const conexion = mysql.createConnection({
    host: "localhost",
    database: "ig_asistencia",
    user: "root",
    password: ""
});

conexion.connect((error) => {
    if (error) {
        console.error("Error de conexión:", error);
    } else {
        console.log("Conexión a MySQL exitosa");
    }
});
// Ruta para insertar un aula
app.post('/aulas', (req, res) => {
    const { nomAula } = req.body;
    const insertQuery = 'INSERT INTO aula (nomAula) VALUES (?)';
    conexion.query(insertQuery, [nomAula], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error al insertar el aula' });
        } else {
            res.status(200).json({ message: 'Aula insertada con éxito', id: result.insertId });
        }
    });
});

app.post('/empleados', (req, res) => {
    const { dniempleado, nombre, apellido, telefono, correo, iddepartamento, estado } = req.body;
    const insertQuery = `
        INSERT INTO empleado (dniempleado, nombre, apellido, telefono, correo, iddepartamento, estado) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    conexion.query(insertQuery, [dniempleado, nombre, apellido, telefono, correo, iddepartamento, estado], (error, result) => {
        if (error) {
            console.error("Error al insertar empleado:", error);
            res.status(500).json({ error: 'Error al insertar el empleado' });
        } else {
            res.status(200).json({ message: 'Empleado insertado con éxito', id: result.insertId });
        }
    });
});

// Ruta para insertar una sección
app.post('/secciones', (req, res) => {
    const { nomSeccion } = req.body;
    const insertQuery = 'INSERT INTO seccion (nomSeccion) VALUES (?)';
    conexion.query(insertQuery, [nomSeccion], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error al insertar la sección' });
        } else {
            res.status(200).json({ message: 'Sección insertada con éxito', id: result.insertId });
        }
    });
});

// Ruta para obtener horarios
app.get('/horarios', (req, res) => {
    const horarios = "SELECT * FROM horario";
    conexion.query(horarios, (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});

// Ruta para insertar un horario
app.post('/horarios', (req, res) => {
    const { nombre, horaentrada, horasalida, diainicio, diafin } = req.body;
    const insertQuery = `
        INSERT INTO horario (nombre, horaentrada, horasalida, diainicio, diafin)
        VALUES (?, ?, ?, ?, ?)
    `;
    conexion.query(insertQuery, [nombre, horaentrada, horasalida, diainicio, diafin], (error, result) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.status(200).json({ message: 'Horario insertado con éxito', id: result.insertId });
        }
    });
});
//Validacion de consulta
app.get('/reporte-asistencia', (req, res) => {
    const { fecha } = req.query;

    const query = `
        SELECT 
            p.nombre AS nombreEmpleado,
            p.apellido AS apellidoEmpleado,
            a.hora_entrada AS horaEntrada,
            a.hora_salida AS horaDeSalida
        FROM asistencia a 
        JOIN empleado p ON p.dniempleado = a.dniempleado
        WHERE a.fecha = ?
    `;

    conexion.query(query, [fecha], (error, results) => {
        if (error) {
            console.error("Error al obtener reporte de asistencia:", error);
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
});

// Ruta para insertar una asistencia
app.post('/asistencia', (req, res) => {
    const { dniempleado, fecha, hora_entrada } = req.body;

    // Primero, verificar si ya existe una entrada para el usuario en la fecha actual
    const checkQuery = `
        SELECT * FROM asistencia WHERE dniempleado = ? AND fecha = ?
    `;

    conexion.query(checkQuery, [dniempleado, fecha], (error, results) => {
        if (error) {
            console.error("Error al verificar asistencia:", error);
            res.status(500).json({ error: 'Error al verificar la asistencia' });
            return;
        }

        if (results.length > 0) {
            // Si ya existe un registro de entrada, se actualiza la hora de salida
            const updateQuery = `
                UPDATE asistencia SET hora_salida = ? WHERE dniempleado = ? AND fecha = ?
            `;
            conexion.query(updateQuery, [hora_entrada, dniempleado, fecha], (error) => {
                if (error) {
                    console.error("Error al actualizar hora de salida:", error);
                    res.status(500).json({ error: 'Error al registrar la hora de salida' });
                } else {
                    res.status(200).json({ message: 'Hora de salida registrada con éxito' });
                }
            });
        } else {
            // Si no existe registro, se inserta como hora de entrada
            const insertQuery = `
                INSERT INTO asistencia (dniempleado, fecha, hora_entrada)
                VALUES (?, ?, ?)
            `;
            conexion.query(insertQuery, [dniempleado, fecha, hora_entrada], (error, result) => {
                if (error) {
                    console.error("Error al insertar asistencia:", error);
                    res.status(500).json({ error: 'Error al registrar la asistencia' });
                } else {
                    res.status(200).json({ message: 'Asistencia registrada con éxito', id: result.insertId });
                }
            });
        }
    });
});
app.get('/departamentos', (req, res) => {
    const query = 'SELECT * FROM departamento';
    conexion.query(query, (error) => {
        if (error) {
            console.error('Error al obtener los departamentos:', error);
            res.status(500).json({ error: 'Error al obtener los departamentos' });
        } 
    });
});



const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
