import conexion from "../models/conexion.js";

export const getAsistenciaAlumnos = async (req, res) => {
    const { tipo, numCuenta, fechaInicio, fechaFin } = req.query;

    try {
        let query = `
            SELECT a.fecha, a.horaEntrada, a.horaSalida, al.numCuenta
            FROM asistencia a
            INNER JOIN asalumno asa ON a.idAsistencia = asa.idAsistencia
            INNER JOIN alumno al ON asa.numCuenta = al.numCuenta
        `;

        let params = [];
        if (tipo === "individual" && numCuenta) {
            query += ` WHERE al.numCuenta = ?`;
            params.push(numCuenta);
        } else if (fechaInicio && fechaFin) {
            query += ` WHERE a.fecha BETWEEN ? AND ?`;
            params.push(fechaInicio, fechaFin);
        }

        const [results] = await conexion.query(query, params);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error al consultar la asistencia de alumnos:", error);
        res.status(500).json({ error: "Error al consultar la asistencia de alumnos" });
    }
};