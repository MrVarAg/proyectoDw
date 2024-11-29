import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors()); 

const conexion = mysql.createConnection({
    host: "localhost",
    database: "asistencia_is",
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

import bcrypt from 'bcrypt';

app.post('/empleados', (req, res) => {
    const { numCuenta, nombre, apellido, correo, activo, idCargo, contrasena } = req.body;

    conexion.beginTransaction(async (err) => {
        if (err) return res.status(500).json({ error: 'Error al iniciar la transacción' });

        try {
            const hashedPassword = await bcrypt.hash(contrasena, 10); // Encripta la contraseña con un salt de 10

            const insertPersona = `
                INSERT INTO persona (numCuenta, nombre, apellido, correo, activo) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const insertEmpleado = `
                INSERT INTO empleado (numCuenta, idCargo)
                VALUES (?, ?)
            `;
            const insertLogin = `
                INSERT INTO login (numCuenta, contrasena)
                VALUES (?, ?)
            `;

            // Inserta en `persona`
            await new Promise((resolve, reject) => {
                conexion.query(insertPersona, [numCuenta, nombre, apellido, correo, activo], (error) => {
                    if (error) return reject(error);
                    resolve();
                });
            });

            // Inserta en `empleado`
            await new Promise((resolve, reject) => {
                conexion.query(insertEmpleado, [numCuenta, idCargo], (error) => {
                    if (error) return reject(error);
                    resolve();
                });
            });

            // Inserta en `login` con contraseña encriptada
            await new Promise((resolve, reject) => {
                conexion.query(insertLogin, [numCuenta, hashedPassword], (error) => {
                    if (error) return reject(error);
                    resolve();
                });
            });

            // Confirma la transacción
            conexion.commit((err) => {
                if (err) throw err;
                res.status(200).json({ message: 'Empleado insertado con éxito' });
            });
        } catch (error) {
            console.error('Error en transacción:', error);
            conexion.rollback(() => {
                res.status(500).json({ error: 'Error al insertar empleado' });
            });
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
    const { tipo, rango, fecha, fechaInicio, fechaFin, numeroIdentidad } = req.query;
    
    let query = `
        SELECT 
            p.nombre AS nombreEmpleado,
            p.apellido AS apellidoEmpleado,
            a.fecha AS fechaAsistencia,
            a.hora_entrada AS horaEntrada,
            a.hora_salida AS horaDeSalida
        FROM asistencia a 
        JOIN empleado p ON p.dniempleado = a.dniempleado
    `;
    let queryParams = [];

    // Agregar filtro de número de identidad si es reporte individual
    if (tipo === "individual" && numeroIdentidad) {
        query += " WHERE a.dniempleado = ?";
        queryParams.push(numeroIdentidad);
    }

    // Agregar filtros de fecha según el tipo de rango
    if (rango === "diario" && fecha) {
        query += tipo === "individual" ? " AND " : " WHERE ";
        query += "a.fecha = ?";
        queryParams.push(fecha);
    } else if ((rango === "semanal" || rango === "mensual") && fechaInicio && fechaFin) {
        query += tipo === "individual" ? " AND " : " WHERE ";
        query += "a.fecha BETWEEN ? AND ?";
        queryParams.push(fechaInicio, fechaFin);
    }

    conexion.query(query, queryParams, (error, results) => {
        if (error) {
            console.error("Error al obtener reporte de asistencia:", error);
            res.status(500).json({ error: 'Error al obtener el reporte de asistencia' });
        } else {
            res.json(results);
        }
    });
});


// Ruta para insertar una asistencia
app.post('/asistencia', (req, res) => {
    const { dniempleado, fecha, hora_entrada } = req.body;

    const claseQuery = `
        SELECT c.idClase 
        FROM rel_emp_cla rec
        JOIN rel_clase_dia rcd ON rec.idClase = rcd.idClase
        JOIN dias d ON rcd.idDia = d.idDia
        JOIN clase c ON rec.idClase = c.idClase
        WHERE rec.dniempleado = ?
          AND d.idDia = CASE DAYOFWEEK(?)
              WHEN 1 THEN 7
              WHEN 2 THEN 1
              WHEN 3 THEN 2
              WHEN 4 THEN 3
              WHEN 5 THEN 4
              WHEN 6 THEN 5
              WHEN 7 THEN 6
          END
          AND ? BETWEEN rcd.horaInicio AND rcd.horaFin
    `;

    // Ejecutar la consulta con los parámetros
    conexion.query(claseQuery, [dniempleado, fecha, hora_entrada], (error, results) => {
        if (error) {
            console.error("Error al verificar clase:", error);
            return res.status(500).json({ error: 'Error al verificar la clase' });
        }

        if (results.length === 0) {
            return res.status(400).json({ error: 'No hay clase asignada en este horario' });
        }

        const idClase = results[0].idClase;

        // Consulta para verificar si ya existe un registro de asistencia para el empleado en la fecha dada
        const checkQuery = `
            SELECT * FROM asistencia WHERE dniempleado = ? AND fecha = ? AND idClase = ?
        `;
        
        conexion.query(checkQuery, [dniempleado, fecha, idClase], (error, existingRecords) => {
            if (error) {
                console.error("Error al verificar asistencia:", error);
                return res.status(500).json({ error: 'Error al verificar la asistencia' });
            }

            if (existingRecords.length > 0) {
                // Si ya existe un registro de entrada, actualizar la hora de salida
                const updateQuery = `
                    UPDATE asistencia SET hora_salida = ? WHERE dniempleado = ? AND fecha = ? AND idClase = ?
                `;
                conexion.query(updateQuery, [hora_entrada, dniempleado, fecha, idClase], (error) => {
                    if (error) {
                        console.error("Error al actualizar hora de salida:", error);
                        return res.status(500).json({ error: 'Error al registrar la hora de salida' });
                    } else {
                        return res.status(200).json({ message: 'Hora de salida registrada con éxito' });
                    }
                });
            } else {
                // Si no existe un registro previo, insertar la nueva asistencia con la hora de entrada y el id de clase
                const insertQuery = `
                    INSERT INTO asistencia (dniempleado, fecha, hora_entrada, idClase)
                    VALUES (?, ?, ?, ?)
                `;
                conexion.query(insertQuery, [dniempleado, fecha, hora_entrada, idClase], (error, result) => {
                    if (error) {
                        console.error("Error al insertar asistencia:", error);
                        return res.status(500).json({ error: 'Error al registrar la asistencia' });
                    } else {
                        return res.status(200).json({ message: 'Asistencia registrada con éxito', id: result.insertId });
                    }
                });
            }
        });
    });
});

app.get('/cargos', (req, res) => {
    const query = 'SELECT idCargo, nomCargo FROM cargo';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los cargo:', error);
            res.status(500).json({ error: 'Error al obtener los departamentos' });
        } else {
            res.json(results); // Envía los resultados como respuesta JSON
        }
    });
});
// Ruta para obtener todas las aulas
app.get('/aulas', (req, res) => {
    const query = 'SELECT idAula, nomAula FROM aula';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener aulas:', error);
            res.status(500).json({ error: 'Error al obtener las aulas' });
        } else {
            res.json(results); // Envía los resultados como respuesta JSON
        }
    });
});

// Ruta para obtener todas las secciones
app.get('/secciones', (req, res) => {
    const query = 'SELECT idSeccion, nomSeccion FROM seccion';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener secciones:', error);
            res.status(500).json({ error: 'Error al obtener las secciones' });
        } else {
            res.json(results); // Envía los resultados como respuesta JSON
        }
    });
});

// Ruta para obtener todos los empleados
app.get('/empleados', (req, res) => {
    const query = 'SELECT dniempleado, nombre, apellido FROM empleado';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener empleados:', error);
            res.status(500).json({ error: 'Error al obtener los empleados' });
        } else {
            res.json(results); // Envía los resultados como respuesta JSON
        }
    });
});

// Ruta para insertar una clase
app.post('/clases', (req, res) => {
    const { nomClase, idAula, idSeccion, horarios, dniEmpleado } = req.body;

    // Insertar la clase
    const insertClaseQuery = 'INSERT INTO clase (nomClase, idAula, idSeccion) VALUES (?, ?, ?)';
    conexion.query(insertClaseQuery, [nomClase, idAula, idSeccion], (error, result) => {
        if (error) {
            console.error('Error al insertar clase:', error);
            return res.status(500).json({ error: 'Error al insertar clase' });
        }

        const claseId = result.insertId;

        // Insertar cada horario en rel_clase_dia
        const horarioPromises = horarios.map((horario) => {
            const { dia, horaInicio, horaFin } = horario;
            const insertHorarioQuery = 'INSERT INTO rel_clase_dia (idClase, idDia, horaInicio, horaFin) VALUES (?, ?, ?, ?)';
            return new Promise((resolve, reject) => {
                conexion.query(insertHorarioQuery, [claseId, dia, horaInicio, horaFin], (error) => {
                    if (error) {
                        console.error('Error al insertar horario:', error);
                        return reject(error);
                    }
                    resolve();
                });
            });
        });

        // Esperar a que se completen todas las inserciones de horarios antes de asignar el docente
        Promise.all(horarioPromises)
            .then(() => {
                const insertDocenteQuery = 'INSERT INTO rel_emp_cla (dniempleado, idClase) VALUES (?, ?)';
                conexion.query(insertDocenteQuery, [dniEmpleado, claseId], (error) => {
                    if (error) {
                        console.error('Error al asignar docente:', error);
                        return res.status(500).json({ error: 'Error al asignar docente a la clase' });
                    }

                    res.status(200).json({ message: 'Clase insertada con éxito', id: claseId });
                });
            })
            .catch((error) => {
                console.error('Error al insertar horarios:', error);
                res.status(500).json({ error: 'Error al insertar horarios' });
            });
    });
});






const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
