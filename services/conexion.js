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

    // Convertir la hora de entrada a formato de objeto Date para comparación
    const entradaHora = new Date(`1970-01-01T${hora_entrada}Z`);

    // Query para obtener la clase del docente en función de la fecha, día y hora de entrada
    const claseQuery = `
        SELECT c.idClase 
        FROM clase c
        JOIN rel_clase_dia r ON c.idClase = r.idClase
        WHERE r.diaSemana = DAYOFWEEK(?) - 1
          AND r.horaInicio <= ? AND r.horaFin >= ?
          AND EXISTS (
              SELECT 1 FROM rel_emp_cla re WHERE re.dniEmpleado = ? AND re.idClase = c.idClase
          )
    `;

    // Ejecutar la consulta para buscar el id de clase correspondiente
    conexion.query(claseQuery, [fecha, entradaHora, entradaHora, dniempleado], (error, results) => {
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

app.get('/departamentos', (req, res) => {
    const query = 'SELECT iddepartamento, departamento FROM departamento';
    conexion.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los departamentos:', error);
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
